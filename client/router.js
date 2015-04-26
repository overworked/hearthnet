Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading'
});

var onBeforeHooks = {
    ensureLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            Router.go('/');
        } else {
            this.next();
        }
    }
};

Router.onBeforeAction(onBeforeHooks.ensureLoggedIn, {only: [
    'home',
    'browse',
    'profile',
    'edit-profile',
    'inbox-username',
    'inbox'
]});

Router.route('/home', {
    name: 'home',
    yieldRegions: {
        'dashboard': {to: 'content'}
    },
    waitOn: function () {
        return Meteor.subscribe('directory');
    },
    data: function () {
        if (this.ready()) {
            var data = {
                featuredUsers: function () {
                    return Meteor.users.find({username: {$not: Meteor.user().username}}, {limit: 3}); //TODO: implement better logic to find featured users & restrict count
                },
                normalUsers: function () {
                    return Meteor.users.find({username: {$not: Meteor.user().username}}, {limit: 8});
                }
            };
            return data;
        }
    },
    action: function () {
        if (this.ready()) {
            this.render();
        }
    }
});

Router.route('/search', function () {
    this.render('search', {to: 'content'}); //TODO: fix it for autopublish removed
});

Router.route('/browse', {
    name: 'browse',
    yieldRegions: {
        'list': {to: 'content'}
    },
    waitOn: function () {
        return Meteor.subscribe('directory');
    },
    data: function () {
        var data = {
            allUsers: function () {
                return Meteor.users.find();
            }
        };

        return data;
    },
    action: function () {
        if (this.ready()) {
            this.render();
        }
    }
});

Router.route('/profiles/:username', {
    name: 'profile',
    layoutTemplate: 'applicationLayout',
    waitOn: function () {
        return Meteor.subscribe('user', this.params.username);
    },
    yieldRegions: {
        'profile': {to: 'content'}
    },
    data: function () {
        return Meteor.users.findOne({username: this.params.username});
        //return Meteor.users.findOne({});
    },
    action: function () {
        this.render();
    }
});

Router.route('/edit-profile', {
    name: 'edit-profile',
    yieldRegions: {
        'editAccount': {to: 'content'}
    },
    data: function () {
        if (this.ready()) {
            return Meteor.user();
        }
    },
    onBeforeAction: function () {
        this.next();
    },
    action: function () {
        this.render();
    }
});

Router.route('/inbox/:username', {
    name: 'inbox-username',
    yieldRegions: {
        'inbox': {to: 'content'}
    },
    waitOn: function () {
        var username = Meteor.user() && Meteor.user().username;
        return [Meteor.subscribe('conversationsForUser', username), Meteor.subscribe('directory')];
    },
    data: function () {
        if (this.ready()) {
            var currentUser = !!Meteor.user() && Meteor.user().username;
            var query;

            if (this.params.username === currentUser) {
                //user messages themselves
                query = {
                    $and: [
                        {'participants.username': currentUser},
                        {'participants.1': {$exists: false}}
                    ]
                };
            }

            query = {
                $and: [
                    {'participants.username': currentUser},
                    {'participants.username': this.params.username}
                ]
            };

            var currentConversation = Conversations.findOne(query, {sort: {date_updated: -1}});

            var data = {
                messages: !!currentConversation && currentConversation.messages,
                conversations: Conversations.find({'participants.username': !!Meteor.user() && Meteor.user().username}, {sort: {date_updated: -1}}),
                participants: !!currentConversation && currentConversation.participants
            };

            return data;
        }
    },
    onBeforeAction: function () {
        this.next();
    },
    action: function () {
        if (this.ready()) {
            this.render();
        }
    }
});

Router.route('/inbox', {
    name: 'inbox',
    yieldRegions: {
        'inbox': {to: 'content'}
    },
    waitOn: function () {
        return [Meteor.subscribe('conversationsForUser', !!Meteor.user() && Meteor.user().username), Meteor.subscribe('directory')];
    },
    data: function () {
        if (this.ready()) {
            var conversations = Conversations.find({'participants.username': !!Meteor.user() && Meteor.user().username}, {sort: {date_updated: -1}}).fetch();

            var data = {
                messages: !!conversations[0] && conversations[0].messages,
                conversations: conversations
            };

            return data;
        }
    },
    onBeforeAction: function () {
        var conversations = Conversations.find({'participants.username': !!Meteor.user() && Meteor.user().username}, {sort: {date_updated: -1}}).fetch();

        if (conversations && conversations.length) {
            var mostRecentConversationSlug = getOtherParticipants(conversations[0].participants)[0].username;

            this.redirect('/inbox/' + mostRecentConversationSlug);
        } else {
            this.next();
        }
    },
    action: function () {
        if (this.ready()) {
            this.render();
        }
    }
});

Router.route('/logout', {
    name: 'logout',
    action: function() {
        Meteor.logout(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('logged out successfully');
                Router.go('/');
            }
        });
    }
})

Router.route('/', function () {
    if (!Meteor.userId()) {
        this.layout('landingLayout');
        this.render('register', {to: 'registration'});
        this.render('login', {to: 'login'});
    } else if (Meteor.userId() && !Session.get('new_user')) { //when user is logged in and not a new user
        Session.set('new_user', false);
        Router.go('home');
    }
});
