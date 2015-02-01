Template.dashboard.helpers({
	featuredUsers: function(){
		return Meteor.users.find({}, {limit:3}); //TODO: implement better logic to find featured users & restrict count
	},
	normalUsers: function(){
		return Meteor.users.find({}, {limit: 8});
	}
});