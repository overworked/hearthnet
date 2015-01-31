Meteor.methods({
    updateUser: function(updatedUser) { console.log('entered function')
        Meteor.users.update({
            _id : Meteor.userId()
        }, {
            $set : {
                email : updatedUser.email,
                preferredDecksToFaceTags : updatedUser.preferredDecksToFaceTags,
                dislikedDecksToFaceTags : updatedUser.dislikedDecksToFaceTags,
                decksUsed : updatedUser.decksUsed
            }
        }, function(error, affected) {
            console.log(error, affected);
        });
    }
});