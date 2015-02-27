Template.inbox.events({
    'click .conversationSelector' : function(e, templateInstance){
        var inboxTargetSlug = getOtherParticipantName(this.participants);
        Router.go('/inbox/'+inboxTargetSlug);
    }
});

Template.conversationView.events({
    'submit #send-inbox-message-form' : function(e, templateInstance){
        e.preventDefault();

        var message = templateInstance.find('#inboxNewMessage').value;
        var messageFields = {
            message: message,
            senderName: Meteor.user().username,
            receiverName: Session.get('messageReceiverId')
        }

        Meteor.call('sendMessage', messageFields, function(err) {
            if (err) {
                console.log(err); //TODO: handle this error properly
            } else {
                templateInstance.find('#inboxNewMessage').value = '';
            }
        });

        return false;
    }
});