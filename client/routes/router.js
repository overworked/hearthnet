Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.route('/home', function() {
    this.render('dashboard', {to: 'content'});
});

Router.route('/', function() {
	this.layout('landingLayout');
	this.render('register', {to: 'registration'});
    this.render('login', {to: 'login'});
});
