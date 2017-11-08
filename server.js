"use strict";

const express = require('express');
const app = express();
const queryRunnerExport = require('./query_runner.js');
var bodyParser = require('body-parser');
var path = require('path');
const queryRunner = queryRunnerExport.buildQueryRunner();

// Get access to use the JSON body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/soccer/games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM game;", send_data_callback);
});

app.get('/soccer/teams', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM team;", send_data_callback);
})

app.get('/soccer/teams/:team_name/team_id', function(req, res) {
	let find_team_id_callback = function(response) {
		
		if (response.length != 1) {
			let message = "Unexpected number [" + response.length + "] of teams found with name [" + req.params.team_name + "]";
			console.log(message);
			res.json(message);
			return;
		}

		console.log("Found one team object with matching name: " + JSON.stringify(response[0]));
		let team_id = response[0]["id"];
		res.json(team_id);
	};

	queryRunner.runQuery("SELECT * FROM team WHERE school_name = '" + req.params.team_name + "';", find_team_id_callback);
})

app.get('/soccer/teams/:team_id/players', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	console.log("SELECT * FROM player WHERE school_id = " + req.params.team_id + ";")
	queryRunner.runQuery("SELECT * FROM player WHERE team_id = " + req.params.team_id + ";", send_data_callback);
})

app.get('/soccer/teams/:team_id/games', function(req, res) {
	//TODO
	let send_data_callback = function(response) {
		res.json(response);
	}

	queryRunner.runQuery("SELECT * FROM game WHERE home_team = " + req.params.team_id + " OR away_team = " + req.params.team_id + ";", 
		send_data_callback);
})

app.get('/soccer/players/:player_id/player_games', function(req, res) {
	//TODO
})

app.use('/', express.static(path.join(__dirname, 'dist')))

//This is specifically setup for Heroku use
//If port is given (Heroku) use that
//Else, use 3000
app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT) {
		console.log('Listening on port ' + process.env.PORT + '!');
	} else {
		console.log('Listening on port 3000!');
	}
});
