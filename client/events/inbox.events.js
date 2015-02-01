Template.inboxContent.events({
    'submit #send-inbox-message-form' : function(e, templateInstance){
        e.preventDefault();

        // console.log(templateInstance);
        // console.log(templateInstance.find('#inboxNewMessage'));
        // cnosole.log(templateInstance.find('#inboxNewMessage').fetch());
        var message = templateInstance.find('#inboxNewMessage').value;
        var messageFields = {
            message: message,
            senderName: Meteor.user().username,
            receiverName: Session.get('messageReceiverId')
        }

        Meteor.call('sendMessage', messageFields, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(messageFields);
                console.log('user has been updated'); //debug
            }
        });

        return false;
    }
});