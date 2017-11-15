# WebApp

## API Documentation

### Soccer Endpoints

#### 1. /soccer/games

    Return a list of all the soccer games

2. /soccer/teams

    Return a list of all the soccer teams
    
3. /soccer/teams/:team_name/team_id

    Send in team_name as a parameter

    Return team_id based on the team_name
    
4. /soccer/teams/:team_id/players

    Send in team_id as a parameter

    Return a list of all the players from that team

5. /soccer/teams/:team_id/games

    Send in team_id as a parameter

    Return a list of all the games that team was a part of

6. /soccer/players/:player_id/player_games

    Send in player_id as a parameter

    Return a list of all the games for the given player
    
7. /soccer/players/:player_name/player_id

    Send in player_name as a parameter

    Return player_id for the given player
 
8. /soccer/team/:team_id/leading_scorers

    Send in team_id as a parameter

    Return a list of the team's leading scorings

9. /soccer/team/:team_id/starters

    Send in team_id as a parameter

    Return a list of the team's starting lineup

10. /soccer/player/:player_id/:number_games/trend

    Send in player_id and the number of games as parameters

    Return player's trends for the past number of games given

11. /soccer/team/:team_id/:number_games/trend

    Send in team_id and the number of games as parameters

    Return team's trends for the past number of games given

### Volleyball Endpoints

12. /vball/games

    Return a list of all the volleyball games

13. /vball/teams

    Return a list of all the volleyball teams

14. /vball/teams/:team_name/team_id

    Send in team_name as a parameter

    Return team_id based on team_name

15. /vball/teams/:team_id/players

    Send in team_id as a parameter

    Return a list of the players on the team

16. /vball/teams/:team_id/games

    Send in team_id as a parameter

    Return a list of the games for the given team

17. /vball/players/:player_name/player_id

    Send in player_name as a parameter

    Return player_id based on player_name

18. /vball/team/:team_id/:number_games/rotation_trends

    Send in team_id and the number of games as parameters

    Return team's rotation trends for the past number of games given

19. /vball/team/:team_id/rotation_trends

    Send in team_id as a parameter

    Return team's rotation trends

20. /vball/team/:team_id/:number_players/top_players

    Send in team_id and number of players as parameters

    Return a list of the team's top players

21. /vball/team/:team_id/:number_players/most_errors

    Send in team_id and number of players as parameters

    Return a list of the number of players of the team's leading errors

22. /vball/team/:team_id/:number_players/digs

    Send in team_id and number of players as parameters

    Return a list of the number of players of the team's leading digs

23. /vball/team/:team_id/assists

    Send in team_id as a parameter

    Return a list of the team's top assists

24. /vball/team/:team_id/:number_players/kills

    Send in team_id and number of players as parameters

    Return a list of the number of players of the team's leading kills
