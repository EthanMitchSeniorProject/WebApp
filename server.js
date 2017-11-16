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
	let send_data_callback = function(response) {
		res.json(response);
	}

	queryRunner.runQuery("SELECT * FROM game WHERE home_team = " + req.params.team_id + " OR away_team = " + req.params.team_id + ";", 
		send_data_callback);
})

app.get('/soccer/players/:player_id/player_games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	queryRunner.runQuery("SELECT * FROM player_game WHERE player_id = " + req.params.player_id + ";", send_data_callback);
})

app.get('/soccer/players/:player_name/player_id', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	queryRunner.runQuery("SELECT id FROM player WHERE name = '" + req.params.player_name + "';", send_data_callback);
})

app.get('/soccer/teams/:team_id/leading_scorers', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	queryRunner.runQuery("SELECT TOP 5 * FROM player WHERE team_id = '" + req.params.team_id + "' ORDER BY points DESC;", send_data_callback)
})

app.get('/soccer/teams/:team_id/starters', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "\
	SELECT name, games_started / games_played as starting_ratio\
	FROM player\
	WHERE team_id = " + req.params.team_id + " \
	AND games_played > 0\
	"
	queryRunner.runQuery(query, send_data_callback)
})

app.get('/soccer/players/:player_id/:number_games/trend', function(req, res) {
	//TODO: Eventually this query should use a date rather than game_id to order
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "\
	SELECT TOP " + req.params.number_games + " p.name, p.id, pg.game_id, pg.goals, pg.assists, pg.starts \
	FROM player p, player_game pg \
	WHERE p.id = pg.player_id \
	AND p.id = " + req.params.player_id + " \
	ORDER BY pg.game_id DESC;"

	queryRunner.runQuery(query, send_data_callback);
})

app.get('/soccer/teams/:team_id/:number_games/trend', function(req, res) {
	//TODO: Eventually this query should use a date rather than game_id to order
	//Returns most recent events
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "\
	SELECT TOP " + req.params.number_games + " t.id AS team_id, t.school_name as school_name, g.id as game_id, g.home_team as home_team, g.away_team as away_team, e.team_id as event_team, e.time_of_event as event_time, e.description_event as description \
	FROM team t, game g, event e \
	WHERE (t.id = g.home_team OR t.id = g.away_team) \
	AND t.id = " + req.params.team_id + " \
	AND e.game_id = g.id \
	ORDER BY e.game_id DESC;\
	"

	queryRunner.runQuery(query, send_data_callback);
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
