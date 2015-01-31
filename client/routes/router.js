Router.route('/login', function() {
    this.render('login');
});

Router.route('/', function() {
    this.render('dashboard');
});