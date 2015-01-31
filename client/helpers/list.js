Template.list.helpers({
    allUsers: function() {
        return Meteor.users.find({});
    }
});