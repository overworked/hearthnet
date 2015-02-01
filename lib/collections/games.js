// GamesSchema = new SimpleSchema({
// 	challenger: {
// 		type: String,
// 		label: "Challenger"
// 	}, 
// 	challenged: {
// 		type: String,
// 		label: "Player Challenged"
// 	},
// 	victor: {
// 		type: String,
// 		label: "Victor"
// 	}
// });

Games = new Mongo.Collection('games');
// Games.attachSchema(GamesSchema);