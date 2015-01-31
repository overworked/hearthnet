Router.configure({
	layoutTemplate: 'applicationLayout'
});

Router.route('/home', function() {
	this.render('dashboard', {to: 'content'});
});

Router.route('/search', function() {
	this.render('search', {to: 'content'});
})


Router.route('/', function() {
	if (!Meteor.userId()) {
		this.layout('landingLayout');
		this.render('register', {to: 'registration'});
		this.render('login', {to: 'login'});
	} else {
		this.redirect('/home');
	}
});
