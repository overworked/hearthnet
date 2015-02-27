Template.profile.events({
    'click button#messageButton': function (e, templateInstance) {
        Router.go('/inbox/'+this.username);
    }
});