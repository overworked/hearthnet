Template.editAccount.events({
    'submit #account-edit-form' : function(e, templateInstance){
        e.preventDefault();
        var username = templateInstance.find('#username').value;
        var email = templateInstance.find('#email').value;
        var preferredDecksToFace = templateInstance.find('#preferredDecksToFaceTags').value.split(' ');
        var dislikedDecksToFace = templateInstance.find('#dislikedDecksTags').value.split(' ');
        var decksUsed = templateInstance.find('#decksUsed').value.split(' ');

        var updatedFields = {
            username : username,
            email : email,
            preferredDecksToFaceTags : preferredDecksToFace,
            dislikedDecksToFaceTags : dislikedDecksToFace,
            decksUsed : decksUsed
        };

        Meteor.call('updateUser', updatedFields, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('user has been updated'); //debug
            }
        });
        return false;
    }
});