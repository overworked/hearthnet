Template.userDashboardCard.events({
    'click a.user-dashboard-card-button': function (e, templateInstance) {
        $(templateInstance.find('.dashboard-card-overlay')).toggleClass('visible');
    }
});