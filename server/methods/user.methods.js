Meteor.methods({
    updateUser: function(updatedUser) {
        Meteor.users.update({
            _id : Meteor.userId()
        }, {
            $set : {
                profile: {
                    email: updatedUser.email,
                    ign : updatedUser.ign,
                    preferredDecksToFaceTags : updatedUser.preferredDecksToFaceTags,
                    dislikedDecksToFaceTags : updatedUser.dislikedDecksToFaceTags,
                    decksUsed : updatedUser.decksUsed
                }
            }
        }, function(error, affected) {
            console.log(error, affected);
        });
    }
});