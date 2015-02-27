Router.configure({
	layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading'
});

Router.route('/home', function() {
	this.render('dashboard', {to: 'content'});
});

Router.route('/search', function() {
	this.render('search', {to: 'content'});
});

Router.route('/browse', function() {
    this.render('list', {to: 'content'});
});

Router.route('/profiles/:username', {
    layoutTemplate: 'applicationLayout',
    yieldRegions: {
        'profile': {to: 'content'}
    },
    data: function() {
        return Meteor.users.findOne({username:this.params.username});
    },
    action: function() {
        this.render();
    }
});

Router.route('/edit-profile', {
    yieldRegions: {
        'editAccount': {to: 'content'}
    },
    data: function() {
        return Meteor.user();
    },
    onBeforeAction : function() {
        this.next();
    },
    action: function() {
        this.render();
    }
});

Router.route('/inbox/:username', {
    yieldRegions: {
        'inbox': {to: 'content'}
    },
        waitOn: function() {
            return [Meteor.subscribe('conversationsForUser', !!Meteor.user() && Meteor.user().username), Meteor.subscribe('directory')];
        },
    data: function() {
        var query = {
            $and: [
                {
                    participants: !!Meteor.user() && Meteor.user().username
                },{
                    participants: this.params.username
                }
            ]
        };

        var conversation = Conversations.findOne(query,{sort:{date_updated:-1}});

        var data =  {
            messages: !!conversation && conversation.messages,
            conversations: Conversations.find({participants : !!Meteor.user() && Meteor.user().username},{sort:{date_updated:-1}})
        };

        return data;
    },
    onBeforeAction: function () {
        Session.set('messageReceiverId', this.params.username);
        this.next();
    },
    action: function() {
        if (this.ready()) {
            this.render();
        }
    }
});

Router.route('/inbox', {
    yieldRegions: {
        'inbox': {to: 'content'}
    },
    // waitOn: function() {
    //     return Meteor.subscribe('conversations', Meteor.userId());
    // },
    data: function() {
        return {
            conversations: Conversations.find({participants : !!Meteor.user() && Meteor.user().username},{sort:{date_updated:-1}})
        };
    },
    action: function() {
        this.render();
    }

});

Router.route('/', function() {
	if (!Meteor.userId()) {
		this.layout('landingLayout');
		this.render('register', {to: 'registration'});
		this.render('login', {to: 'login'});
	} else if (Meteor.userId() && !Session.get('new_user')) { //when user is logged in and not a new user
        Session.set('new_user', false);
        this.redirect('/home');
	}
});

Router.onAfterAction(function () {
  if (Meteor.isClient) {
    Deps.afterFlush(function () {
      Foundation.libs.offcanvas.events()
    });
  }
}, {where:'client'});
