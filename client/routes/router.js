Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.route('/', function() {
    this.render('dashboard');
});

Router.route('/login', function() {
    this.render('login');
});
