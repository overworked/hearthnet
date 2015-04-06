getOtherParticipants = function getOtherParticipants(participants) {
	var otherParticipants = [];

	for (var i=0; i<participants.length; ++i) {
		if (participants[i].username !== Meteor.user().username) {
			otherParticipants.push(participants[i]);
		}
	}

	if (!otherParticipants.length) { //edge case where user messages themselves (doesn't work) TODO: Implement this properly
		return participants[0].username;
	}

	return otherParticipants;
}