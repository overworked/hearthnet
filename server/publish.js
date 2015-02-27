Meteor.publish('conversationsForUser', function(userId) {
	// find all the conversations where the contributors array contains the value this.userId() <-- logged in user
	// docs.mongodb.org/manual/reference/operator/query/eq/
	return Conversations.find({participants : userId});
});

Meteor.publish('directory', function() {
	return Meteor.users.find();
});

// Meteor.publish('conversations', function() {
// 	return Conversations.find();
// });