Meteor.methods({
    updateUser: function (updatedUser) {
        Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $set: {
                profile: {
                    description: updatedUser.description,
                    email: updatedUser.email,
                    ign: updatedUser.ign,
                    preferredDecksToFace: updatedUser.preferredDecksToFace,
                    dislikedDecksToFace: updatedUser.dislikedDecksToFace,
                    decksUsed: updatedUser.decksUsed
                }
            }
        }, function (error, affected) {
            console.log(error, affected); //TODO: handle this error properly
        });
    },
    sendMessage: function (message) {
        message['date'] = message['date'] || Date.now();

        var query = {
            $and: [
                {participants: message['receiverName']},
                {participants: message['senderName']}
            ]
        };

        if (Conversations.findOne(query)) {
            Conversations.update(query, {$push: {messages: message}});
        } else {
            Conversations.insert({messages: [message], participants: [message['receiverName'], message['senderName']]});
        }
    },
    maybeCreateConversation: function (receiverUsername) {
        var query = {
            $and: [
                {participants: receiverUsername},
                {participants: Meteor.user().username}
            ]
        };
        var conversation = Conversations.findOne(query);

        if (!conversation) {
            Conversations.insert({
                messages: [],
                participants: [{username: receiverUsername, role: 'participant'}, {
                    username: Meteor.user().username,
                    role: 'creator'
                }]
            }, function (err, result) {
                if (err) {
                    console.log(err); //TODO: Handle error properly
                    return;
                }

                console.log(result);
            });
        }
    }
});
