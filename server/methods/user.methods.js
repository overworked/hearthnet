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
    sendMessage: function (message, participants) {
        message['date'] = message['date'] || Date.now();

        //TODO: verify identity of logged in user

        var query = {
            $and: [
                {'participants.username': participants[0].username},
                {'participants.username': participants[1].username}
            ]
        };

        if (Conversations.findOne(query)) {
            console.log('found'); console.log(message);
            Conversations.update(query, {$push: {messages: message}});
        } else {
            console.log('not found'); console.log(message);
            Conversations.insert({messages: [message], participants: participants });
        }
    },
    maybeCreateConversation: function (receiverUsername) {
        var query = {
            $and: [
                {'participants.username': receiverUsername},
                {'participants.username': Meteor.user().username}
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

                console.log('Created conversation.');
            });
        }
    }
});
