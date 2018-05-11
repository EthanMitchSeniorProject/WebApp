# Calvin Scouting Report Web Application

## Web Server API Documentation

### Common Endpoints

#### 1. /addTeam

    Gets the max id from either the team or vball_team table

    Inserts a new team into either the team or vball_team table

### Soccer Endpoints

#### 2. /soccer/game/:game_id

    Parameter: game_id

    Return: List of events from the game

#### 3. /soccer/teams

    Parameter: none

    Return: List of all the soccer teams to be scraped for data
    
#### 4. /soccer/teams/:team_name/team_id

    Parameter: team_name

    Return: Array of information on the team
    
#### 5. /soccer/teams/:team_id/players

    Parameter: team_id

    Return: List of all players from the team

#### 6. /soccer/teams/:team_id/games

    Parameter: team_id

    Return: List of all games for the team

#### 7. /soccer/players/:player_name/player_id

    Parameter: player_name

    Return: Integer id for the player
    
#### 8. /soccer/players/:team_id/starters

    Parameter: team_id

    Return: List of players who have played in a game for the team

#### 9. /soccer/players/:player_id/trend/:number_games

    Parameters: player_id, number_games

    Return: The number of goals, assists, and starts for the player in the past number of games

#### 10. /soccer/teams/:team_id/:number_games/trend

    Parameters: team_id, number_games

    Return: Team information for the team for the past number of games

#### 11. /soccer/games/:game_id/score

    Parameter: game_id

    Return: The final score of the game

#### 12. /soccer/teams/routes

    Parameter: none

    Return: List of team routes

### Volleyball Endpoints

#### 13. /vball/teams

    Parameter: none

    Return: List of all volleyball teams

#### 14. /vball/teams/with_routes

    Parameter: none

    Return: List of all volleyball teams to be scraped for data

#### 15. /vball/teams/:team_id/games

    Parameter: team_id

    Return: List of all the games for the team

#### 16. /vball/teams/:team_name/team_id

    Parameter: team_name

    Return: Id for the team

#### 17. /vball/teams/:rotation/totals/:game_id

    Parameters: rotation, game_id

    Return: Counts of all results from the rotation from the game

#### 18. /vball/teams/:rotation/split/:game_id

    Parameters: rotation, game_id

    Return: Counts of all results from the rotation from the game

#### 19. /vball/teams/:team_id/team_name

    Parameters: team_id

    Return: Team name from the team id

#### 20. /vball/teams/:rotation/:game_id/:team_id/servers

    Parameters: rotation, game_id, team_id

    Return: List of all players' names who served in for the team in the rotation in the game
