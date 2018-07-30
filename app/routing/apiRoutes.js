// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// User input (object)
		var userInput = req.body; //Make a path since I will use this a lot

		var userResponses = userInput.scores; //second most used path in object

		// Compute best friend match
		var matchName = ''; //yet to be determined
		var matchImage = ''; //determined once name is determined
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user ... will reset once server terminated
		friends.push(userInput);

		// Send match response data
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};
