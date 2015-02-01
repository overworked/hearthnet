Template.applicationLayout.helpers({
  pageTitle: function() {
  	if (Session.get("pageTitle"))
  		return Session.get("pageTitle");
  	else if (document.location.pathname.indexOf("home") > -1)
  		return "Dashboard";
  	else if (document.location.pathname.indexOf("search") > -1)
  		return "Search";
  	else if (document.location.pathname.indexOf("browse") > -1)
  		return "Browse";
  	else if (document.location.pathname.indexOf("profile") > -1)
  		return "My Profile";
  	else
  		return "Dashboard";
  }
});

Template.applicationLayout.events({
	'click .nav-item': function(e) {
		Session.set("pageTitle", e.target.innerText);
	}
});
