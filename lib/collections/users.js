// ProfileSchema = new SimpleSchema({
// 	description: {
// 		type: String,
// 		label: "Description",
// 		optional: true
// 	},
// 	ign: {
// 		type: String,
// 		label: "In game name",
// 		optional: true,
// 	},
// 	email: {
// 		type: String,
// 		label: "Email",
// 		optional: true
// 	},
// 	wins: {
// 		type: [GamesSchema],
// 		label: "Games won",
// 		optional: true
// 	},
// 	losses: {
// 		type: [GamesSchema],
// 		label: "Games lost",
// 		optional: true
// 	},
// 	playStyles: {
// 		type: [String],
// 		label: "Play styles",
// 		optional: true
// 	},
// 	decks: {
// 		type: [DecksSchema],
// 		label: "Decks",
// 		optional: true
// 	}

// });

// UsersSchema = new SimpleSchema({
// 	profile: {
// 		type: ProfileSchema,
// 		optional: true
// 	}
// });

// Meteor.users.attachSchema(UsersSchema);