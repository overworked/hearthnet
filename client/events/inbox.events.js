Template.inbox.events({
    'click .conversationSelector': function (e, templateInstance) {
        var inboxTargetSlug = getOtherParticipants(this.participants)[0].username;
        Router.go('/inbox/' + inboxTargetSlug);
    }
});

Template.conversationView.events({
    'submit #send-inbox-message-form': function (e, templateInstance) {
        e.preventDefault();

        var message = templateInstance.find('#inboxNewMessage').value;
        var messageFields = {
            message: message,
            author_username: Meteor.user().username
        };

        Meteor.call('sendMessage', messageFields, templateInstance.data.participants, function (err) {
            if (err) {
                console.log(err); //TODO: handle this error properly
            } else {
                templateInstance.find('#inboxNewMessage').value = '';
            }
        });

        return false;
    }
});