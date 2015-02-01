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

Router.route('/profile/:_id', {
    layoutTemplate: 'applicationLayout',
    yieldRegions: {
        'profile': {to: 'content'}
    },
    data: function() {
        console.log(Meteor.users.findOne({_id:this.params._id}));
        return Meteor.users.findOne({_id:this.params._id});
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
