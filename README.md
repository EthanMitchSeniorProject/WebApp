# WebApp

## API Documentation

### Soccer Endpoints

#### 1. /soccer/games

    Return a list of all the soccer games

#### 2. /soccer/teams

    Return a list of all the soccer teams
    
#### 3. /soccer/teams/:team_name/team_id

    Send in team_name as a parameter

    Return team_id based on the team_name
    
#### 4. /soccer/teams/:team_id/players

    Send in team_id as a parameter

    Return a list of all the players from that team

#### 5. /soccer/teams/:team_id/games

    Send in team_id as a parameter

    Return a list of all the games that team was a part of

#### 6. /soccer/players/:player_id/player_games

    Send in player_id as a parameter

    Return a list of all the games for the given player
    
#### 7. /soccer/players/:player_name/player_id

    Send in player_name as a parameter

    Return player_id for the given player
 
#### 8. /soccer/teams/:team_id/leading_scorers

    Send in team_id as a parameter

    Return a list of the team's leading scorings

#### 9. /soccer/teams/:team_id/starters

    Send in team_id as a parameter

    Return a list of the team's starting lineup

#### 10. /soccer/players/:player_id/:number_games/trend

    Send in player_id and the number of games as parameters

    Return player's trends for the past number of games given

#### 11. /soccer/teams/:team_id/:number_games/trend

    Send in team_id and the number of games as parameters

    Return team's trends for the past number of games given

### Volleyball Endpoints

#### 16. /vball/teams/:team_id/games

    Send in team_id as a parameter

    Return a list of the games for the given team

#### 17. /vball/teams/:rotation/totals/:game_id

    Send in rotation and game_id as parameters

    Return total count for how many plays the given rotation played in the given game

#### 18. /vball/teams/:rotation/split/:game_id

    Send in rotation and game_id as parameters

    Return counts for the given rotation based on the results from the given game

#### 19. /vball/teams/:id/team_name

    Send in team_id as a parameter

    Return the team name
