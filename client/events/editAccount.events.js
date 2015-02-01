Template.editAccount.events({
    'submit #account-edit-form' : function(e, templateInstance){
        e.preventDefault();

        var username = templateInstance.find('#username').value;
        var ign = templateInstance.find('#ign').value;
        var description = templateInstance.find('#description').value;
        var email = templateInstance.find('#email').value;
        var preferredDecksToFace = templateInstance.find('#preferredDecksToFace').value.split(',').join(' ').split(' ').filter(function(e){return e;});
        var dislikedDecksToFace = templateInstance.find('#dislikedDecksToFace').value.split(',').join(' ').split(' ').filter(function(e){return e;});
        var decksUsed = templateInstance.find('#decksUsed').value.split(',').join(' ').split(' ').filter(function(e){return e;});

        var updatedFields = {
            username : username,
            ign : ign,
            description : description,
            email : email,
            preferredDecksToFace : preferredDecksToFace,
            dislikedDecksToFace : dislikedDecksToFace,
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