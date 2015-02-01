Meteor.methods({
    updateUser: function(updatedUser) {
        Meteor.users.update({
            _id : Meteor.userId()
        }, {
            $set : {
                profile: {
                    description: updatedUser.description,
                    email: updatedUser.email,
                    ign : updatedUser.ign,
                    preferredDecksToFace : updatedUser.preferredDecksToFace,
                    dislikedDecksToFace : updatedUser.dislikedDecksToFace,
                    decksUsed : updatedUser.decksUsed
                }
            }
        }, function(error, affected) {
            console.log(error, affected);
        });
    },
    sendMessage: function(message) {
        message['date'] = message['date'] || Date.now();

        var query = {
            $and: [
                {
                    participants: message['receiverName']
                },{
                    participants: message['senderName']
                }
            ]
        };

        if(Conversations.findOne(query)) {

            Conversations.update(query, {$push: {messages: message}});
            console.log('updated message');

        } else {
            Conversations.insert({messages: [message], participants: [message['receiverName'], message['senderName']]});
            console.log('created convo and added first message');
        }
    }
});
