Template.inbox.helpers({
	getOtherParticipantName: function(participants) {
		return getOtherParticipantName(participants);
	},
    isConversationsNonEmpty: function(conversations) {
        if (conversations) {
            if (conversations.count) {
                return conversations.count();
            } else if (conversations.length) {
                return conversations.length;
            }
        }

        return false;
    }
});