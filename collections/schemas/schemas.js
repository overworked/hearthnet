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
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: ProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    }
});

MessageSchema = new SimpleSchema({
    message: {
        type: String
    },
    author_username: {
        type: String
    }
});

ParticipantSchema = new SimpleSchema({
    username: {
        type: String
    },
    role: {
        type: String,
        allowedValues: ['creator', 'participant']
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