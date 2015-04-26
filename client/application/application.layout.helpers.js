Template.applicationLayout.helpers({
    isVisible: function() {
        return Session.get('isNavigationVisible') ? 'is-visible' : '';
    }
});
