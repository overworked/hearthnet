Template.register.events({
    'submit #register-form': function (e, templateInstance) {
        e.preventDefault();
        var username = templateInstance.find('#account-username').value;
        var password = templateInstance.find('#account-password').value;

        console.log('Got inside the event handler');

        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                wins: [],
                losses: [],
                decksUsed: [],
                preferredDecksToFace: [],
                dislikedDecksToFace: []
            }
        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('user has been registered and logged in'); //debug
                Session.set('new_user', 'true');

                Router.go('/edit-profile');
            }
        });

        return false;
    }
});