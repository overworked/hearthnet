getOtherParticipantName = function getOtherParticipantName(participants) {
	if (participants) {
		for(var i=0; i<participants.length; ++i) {
			var currentUsername = Meteor.user() && Meteor.user().username;
			if (participants[i] !== currentUsername) {
				return participants[i];
			}
		}
	}
}