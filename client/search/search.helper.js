Template.search.helpers({
    searchUsers: function () {
        return Session.get('searchResults')
    }
});