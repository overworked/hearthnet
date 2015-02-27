Meteor.publish('conversationsForUser', function(username) {
	// find all the conversations where the contributors array contains the value this.userId() <-- logged in user
	// docs.mongodb.org/manual/reference/operator/query/eq/
	return Conversations.find({participants : username});
});

Meteor.publish('directory', function() {
	return Meteor.users.find();
});

// Meteor.publish('conversations', function() {
// 	return Conversations.find();
// });