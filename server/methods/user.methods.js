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
    }
});