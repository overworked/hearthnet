Router.configure({
	layoutTemplate: 'applicationLayout'
});

Router.route('/home', function() {
	this.render('dashboard', {to: 'homeContent'});
});

Router.route('home/test', function() {
	this.render('dashboard', {to: 'homeContent'});
	this.render('test', {to: 'nav-bar'})
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
