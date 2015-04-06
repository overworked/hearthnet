// // empty
// CardsSchema = new SimpleSchema({
// 	name: {
// 		type: String
// 	}
// });

// DecksSchema = new SimpleSchema({
// 	cards: {
// 		type: [CardsSchema],
// 		label: "Cards",
// 		minCount: 30,
// 		maxCount: 30
// 	}
// });

Decks = new Mongo.Collection('decks');
// Decks.attachSchema(DecksSchema);