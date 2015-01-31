Template.dashboard.helpers({
	featuredUsers: function(){
		return Meteor.users.find({}); //TODO: implement better logic to find featured users & restrict count
	}
});