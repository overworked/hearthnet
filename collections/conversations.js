Conversations = new Mongo.Collection("conversations");

MessageSchema = new SimpleSchema({
    message: {
        type: String
    },
    author_username: {
        type: String
    },
    date: {
        type: Date
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

Conversations.attachSchema(ConversationSchema);