Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.route('/', function() {
    this.render('dashboard', {to: 'content'});
});

Router.route('/login', function() {
	this.layout('loginLayout');
    this.render('login');
});

Router.route('/register', function() {
	this.layout('registerLayout');
	this.render('register');
})