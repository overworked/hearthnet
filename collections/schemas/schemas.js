ProfileSchema = new SimpleSchema({
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    ign: { //TODO: Replace with BattleTag
        type: String,
        label: "In game name",
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        optional: true
    }
});

UserSchema = new SimpleSchema({
    profile: {
        type: ProfileSchema
    }
});

MessageSchema = new SimpleSchema({
    message: {
        type: String
    },
    author: {
        type: UserSchema
    }
});

ParticipantSchema = new SimpleSchema({
    account: {
        type: UserSchema
    }
});

ConversationSchema = new SimpleSchema({
    messages: {
        type: [MessageSchema]
    },
    participants: {
        type: [ParticipantSchema]
    }
});