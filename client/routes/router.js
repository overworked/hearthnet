Router.configure({
	layoutTemplate: 'applicationLayout'
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
        console.log(Meteor.users.findOne({username:this.params.username}));
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

Router.route('/inbox', {
    yieldRegions: {
        'inbox': {to: 'content'}
    },
    waitOn: function() {
        return Meteor.subscribe('conversations', Meteor.userId());
    },
    data: function() {
        var returnData = {conversationsList: Conversations.find({}).fetch()};
        console.log(returnData);
        return returnData;
        // return {conversationsList:Conversations.find({}).fetch()};
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
