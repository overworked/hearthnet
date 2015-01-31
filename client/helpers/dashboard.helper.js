Template.dashboard.helpers({
	featuredUsers: Meteor.users.find({}) //TODO: implement better logic to find featured users & restrict count
});