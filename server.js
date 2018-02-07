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

/*
--------------------------------------Soccer Routes----------------------------------------------
*/

//1
app.get('/soccer/games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM game;", send_data_callback);
})

//2
app.get('/soccer/teams', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM team;", send_data_callback);
})

//3
app.get('/soccer/teams/:team_name/team_id', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * \
				FROM team \
				WHERE school_name = '" + req.params.team_name + "';";
	queryRunner.runQuery(query, send_data_callback);
})

//4
app.get('/soccer/teams/:team_id/players', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM player WHERE team_id = " + req.params.team_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//5
app.get('/soccer/teams/:team_id/games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM game WHERE home_team = " + req.params.team_id + " OR away_team = " + req.params.team_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//6
app.get('/soccer/players/:player_id/player_games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM player_game WHERE player_id = " + req.params.player_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//7
app.get('/soccer/players/:player_name/player_id', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT id FROM player WHERE name = '" + req.params.player_name + "';";
	queryRunner.runQuery(query, send_data_callback);
})

//8
app.get('/soccer/teams/:team_id/leading_scorers', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP 5 * FROM player WHERE team_id = '" + req.params.team_id + "' ORDER BY points DESC;";
	queryRunner.runQuery(query, send_data_callback);
})

//9
app.get('/soccer/teams/:team_id/starters', function(req, res) {
	let send_data_callback = function(response) {
		for(var i = 0; i < response.length; i++) {
			response[i].starting_ratio = Math.round(response[i].games_started / response[i].games_played);
		}
		res.json(response);
	}

	let query = "\
	SELECT name, num, games_started, games_played\
	FROM player\
	WHERE team_id = " + req.params.team_id + " \
	AND games_played > 0\
	"
	queryRunner.runQuery(query, send_data_callback)
})

//10
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

//11
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

/*
--------------------------------------Volleyball Routes----------------------------------------------
Not working: vball/teams/0/games
*/

//12
app.get('/vball/games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM vball_game;", send_data_callback);
})

//13
app.get('/vball/teams', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	};

	queryRunner.runQuery("SELECT * FROM vball_team;", send_data_callback);
})

//14
app.get('/vball/teams/:team_name/team_id', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * \
				FROM vball_team \
				WHERE school_name = '" + req.params.team_name + "';";
	queryRunner.runQuery(query, send_data_callback);
})

//15
app.get('/vball/teams/:team_id/players', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM vball_player WHERE team_id = " + req.params.team_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//16
app.get('/vball/teams/:team_id/games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM vball_game WHERE home_team = " + req.params.team_id + " OR away_team = " + req.params.team_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//17
app.get('/vball/players/:player_id/player_games', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM vball_player_game WHERE player_id = " + req.params.player_id + ";"
	queryRunner.runQuery(query, send_data_callback);
})

//18
app.get('/vball/players/:player_name/player_id', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT id FROM vball_player WHERE name = '" + req.params.player_name + "';";
	queryRunner.runQuery(query, send_data_callback);
})

//19
app.get('/vball/teams/:team_id/:player_id/:number_games/rotation_trends', function(req, res) {
	//TODO: eventually, this will need to only search for the past number_games
	//		given in the parameter list
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM vball_play WHERE team_id = " + req.params.team_id + " AND server_id = " + req.params.player_id + ";";
	queryRunner.runQuery(query, send_data_callback);
})

//20
app.get('/vball/teams/:team_id/:player_id/rotation_trends', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT * FROM vball_play WHERE team_id = " + req.params.team_id + " AND server_id = " + req.params.player_id + ";";
	queryRunner.runQuery(query, send_data_callback);
})

//21
//Kills + service aces + block solos + ½ block assists = points
app.get('/vball/teams/:team_id/:number_players/top_players', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP " + req.params.number_players + " * FROM vball_player WHERE team_id = " + req.params.team_id + " ORDER BY points DESC;";
	queryRunner.runQuery(query, send_data_callback);
})

//22
app.get('/vball/teams/:team_id/:number_players/hitting_errors', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP " + req.params.number_players + " * FROM vball_player WHERE team_id = " + req.params.team_id + " ORDER BY errors DESC;"
	queryRunner.runQuery(query, send_data_callback);
})

//23
app.get('/vball/teams/:team_id/:number_players/digs', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP " + req.params.number_players + " * FROM vball_player WHERE team_id = " + req.params.team_id + " ORDER BY digs DESC;"
	queryRunner.runQuery(query, send_data_callback);
})

//24
app.get('/vball/teams/:team_id/:number_players/assists', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP " + req.params.number_players + " * FROM vball_player WHERE team_id = " + req.params.team_id + " ORDER BY assists DESC;"
	queryRunner.runQuery(query, send_data_callback);
})

//25
app.get('/vball/teams/:team_id/:number_players/kills', function(req, res) {
	let send_data_callback = function(response) {
		res.json(response);
	}

	let query = "SELECT TOP " + req.params.number_players + " * FROM vball_player WHERE team_id = " + req.params.team_id + " ORDER BY kills DESC;"
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
