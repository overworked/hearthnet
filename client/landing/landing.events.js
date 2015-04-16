Template.landingLayout.helpers({
    isLogin: function () {
        return Session.get("isLogin");
    }
});

Template.landingLayout.events({
    'click .tab-title': function (e) {
        $(".user-panel .tabs li").each(function (i) {
            $(this).removeClass("active");
        });
        $(e.target.parentElement).addClass("active");

        if (e.target.innerText == 'Sign up') {
            Session.set("isLogin", false);
        } else {
            Session.set("isLogin", true);
        }
        return false;
    }
});