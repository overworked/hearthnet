Template.applicationLayout.helpers({
    pageTitle: function() {
        if (Session.get('pageTitle'))
            return Session.get('pageTitle');
        else if (document.location.pathname.indexOf('home') > -1)
            return 'Dashboard';
        else if (document.location.pathname.indexOf('search') > -1)
            return 'Search';
        else if (document.location.pathname.indexOf('browse') > -1)
            return 'Browse';
        else if (document.location.pathname.indexOf('profile') > -1)
            return 'My Profile';
        else
            return 'Dashboard';
    }
});

Template.applicationLayout.events({
    'click .nav-item': function(e) {
        Session.set('pageTitle', e.target.innerText);
    },
    'click .sliding-panel-button, click .sliding-panel-fade-screen, click .sliding-panel-close': function(e, templateInstance) {
        if (!Session.get('isNavigationVisible')) {
            Session.set('isNavigationVisible', true);
        } else {
            Session.set('isNavigationVisible', false);
        }
    },
    'click .sliding-panel-content': function(e, templateInstance) {
        Session.set('isNavigationVisible', false);
    }
});
