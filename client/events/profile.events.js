Template.profile.events({
    'click button#messageButton': function (e, templateInstance) {
        var self = this;

        Meteor.call('maybeCreateConversation', self.username, function (err) {
            if (err) {
                console.log(err); //TODO: handle this error properly
            } else {
                Router.go('/inbox/' + self.username);
            }
        });
    }
});