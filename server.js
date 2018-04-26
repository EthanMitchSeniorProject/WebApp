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

let send_data_callback = function(res, data_response) {
	res.json(data_response);
}

/*
--------------------------------------Soccer Routes----------------------------------------------
*/

app.get('/soccer/game/:game_id', function(req, res) {
	queryRunner.runQuery("SELECT * FROM Event where game_id = " + req.params.game_id + ";", send_data_callback, res);
})

//2
app.get('/soccer/teams', function(req, res) {
	queryRunner.runQuery("SELECT * FROM team;", send_data_callback, res);
})

//3
app.get('/soccer/teams/:team_name/team_id', function(req, res) {
	let query = "SELECT * \
				FROM team \
				WHERE school_name = '" + req.params.team_name + "';";
	queryRunner.runQuery(query, send_data_callback, res);
})

//4
app.get('/soccer/teams/:team_id/players', function(req, res) {
	let query = "SELECT *\
				FROM player p JOIN (\
					SELECT player_id, SUM(goals) as goals, SUM(assists) as assists\
					FROM player_game\
					GROUP BY player_id) pg\
				ON p.id = pg.player_id\
				WHERE team_id = " + req.params.team_id + "\
				AND games_played > 0;"
	queryRunner.runQuery(query, send_data_callback, res);
})

//5
app.get('/soccer/teams/:team_id/games', function(req, res) {
	let query = "SELECT g.id, g.home_team as home_id, g.away_team as away_id, t.school_name as opponent, g.game_date as date \
				FROM game g, team t \
				WHERE (g.home_team = " + req.params.team_id + " OR g.away_team = " + req.params.team_id + ") \
				AND (t.id = g.home_team OR t.id = g.away_team) \
				AND t.id <> " + req.params.team_id + ";"
	queryRunner.runQuery(query, send_data_callback, res);
})

//7
app.get('/soccer/players/:player_name/player_id', function(req, res) {
	let query = "SELECT id FROM player WHERE name = '" + req.params.player_name + "';";
	queryRunner.runQuery(query, send_data_callback, res);
})

//9
app.get('/soccer/teams/:team_id/starters', function(req, res) {
	let handle_data_callback = function(res, data_response) {
		for(var i = 0; i < data_response.length; i++) {
			data_response[i].starting_ratio = Math.round(data_response[i].games_started / data_response[i].games_played);
		}
		res.json(data_response);
	}

	let query = "\
	SELECT name, num, games_started, games_played\
	FROM player\
	WHERE team_id = " + req.params.team_id + " \
	AND games_played > 0\
	"
	queryRunner.runQuery(query, handle_data_callback, res)
})

//10
app.get('/soccer/players/:player_id/trend/:number_games', function(req, res) {
	//TODO: Eventually this query should use a date rather than game_id to order
	let handle_data_callback = function(res, data_response) {
		let trend_data = {goals: 0, assists: 0, starts: 0};
		for(var i = 0; i < data_response.length; i++) {
			trend_data["goals"] += data_response[i]["goals"];
			trend_data["assists"] += data_response[i]["assists"];
			trend_data["starts"] += data_response[i]["starts"];
		}
		res.json(trend_data);
	}

	let query = "\
	SELECT TOP " + req.params.number_games + " pg.game_id, SUM(pg.goals) as goals, SUM(pg.assists) as assists, SUM(CAST(pg.starts AS INT)) as starts \
	FROM player p, player_game pg \
	WHERE p.id = pg.player_id \
	AND p.id = " + req.params.player_id + " \
	GROUP BY pg.game_id \
	ORDER BY pg.game_id DESC;"

	queryRunner.runQuery(query, handle_data_callback, res);
})

//11
app.get('/soccer/teams/:team_id/:number_games/trend', function(req, res) {
	let query = "\
	SELECT TOP " + req.params.number_games + " t.id AS team_id, t.school_name as school_name, g.id as game_id, g.home_team as home_team, g.away_team as away_team, e.team_id as event_team, e.time_of_event as event_time, e.description_event as description \
	FROM team t, game g, event e \
	WHERE (t.id = g.home_team OR t.id = g.away_team) \
	AND t.id = " + req.params.team_id + " \
	AND e.game_id = g.id \
	ORDER BY e.game_id DESC;"

	queryRunner.runQuery(query, send_data_callback, res);
})

app.get('/soccer/games/:game_id/score', function(req, res) {
	let query = "select COUNT(team_id) as goals, team_id  \
	from event \
	where game_id = " + req.params.game_id + " \
	group by team_id;";

	queryRunner.runQuery(query, send_data_callback, res);
})

app.get('/soccer/teams/routes', function(req, res) {
	let query = "SELECT * FROM soccer_team_route;";

	queryRunner.runQuery(query, send_data_callback, res);
})

/*
--------------------------------------Volleyball Routes----------------------------------------------
*/

app.get('/vball/teams', function(req, res) {
	let query = "SELECT * FROM vball_team;";
	queryRunner.runQuery(query, send_data_callback, res);
})

app.get('/vball/teams/:team_id/games', function(req, res) {
	let query = "SELECT * FROM vball_game WHERE home_team = " + req.params.team_id + " OR away_team = " + req.params.team_id + " ORDER BY game_date;"
	queryRunner.runQuery(query, send_data_callback, res);
})

app.get('/vball/teams/:team_name/team_id', function(req, res) {
	let query = "SELECT id FROM vball_team WHERE school_name = '" + req.params.team_name + "';";
	queryRunner.runQuery(query, send_data_callback, res);
})

app.get('/vball/teams/:rotation/totals/:game_id', function(req, res) {
	let query = "SELECT COUNT(*) AS COUNT FROM vball_play WHERE rotation = " + req.params.rotation + " AND game_id = " + req.params.game_id + ";";
	queryRunner.runQuery(query, send_data_callback, res);
});

app.get('/vball/teams/:rotation/split/:game_id', function(req, res) {
	let query = "SELECT COUNT(*) AS COUNT, result, winning_team_point FROM vball_play WHERE rotation = " + req.params.rotation + " AND game_id = " + req.params.game_id + " GROUP BY result, winning_team_point;";
	queryRunner.runQuery(query, send_data_callback, res);
});

app.get('/vball/teams/:id/team_name', function(req, res) {
	let query = "SELECT school_name FROM vball_team WHERE id = " + req.params.id + ";";
	queryRunner.runQuery(query, send_data_callback, res);
});

app.get('/vball/teams/:rotation/:game_id/servers', function(req, res) {
	let query = "SELECT DISTINCT vball_player.name FROM vball_player, vball_play WHERE vball_play.game_id = " + req.params.game_id + " AND vball_play.rotation = " + req.params.rotation + " AND vball_play.server_id = vball_player.id;";
	queryRunner.runQuery(query, send_data_callback, res);
});

app.use('/', express.static(path.join(__dirname, 'dist')))

//This is specifically setup for Heroku use
//If port is given (Heroku) use that
//Else, use 3000
//TODO: Change port to 80
app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT) {
		console.log('Listening on port ' + process.env.PORT + '!');
	} else {
		console.log('Listening on port 3000!');
	}
});
