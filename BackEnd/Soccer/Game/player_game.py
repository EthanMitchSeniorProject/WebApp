import pyodbc
from database_connection import DatabaseConnection

connection = DatabaseConnection.getConnection()

class PlayerGame(object):
    #Init:
    #Player Name (Used to find player.ID)
    #Game Database ID
    #Goals
    #Assists
    #Starter strings (array of two strings that contain the names of each team's starter)

    def __init__(self, name, game_id, goals, assists, starter_strings):
        self.name = name
        self.game_id = game_id
        self.goals = goals
        self.assists = assists
        self.started = False
        for start_str in starter_strings:
            if (self.name in start_str):
                self.started = True

    def __findPlayerId(self):
        cursor = connection.cursor()
        sql_command = "SELECT id FROM player where name = '" + self.name + "';"
        cursor.execute(sql_command)
        row = cursor.fetchone()
        if (row is None):
            return None
        return row[0]

    def sendToDatabase(self):
        start_bit = 0
        if self.started:
            start_bit = 1
        
        player_id = self.__findPlayerId()

        if (player_id is None):
            print("No player exists in player table with name: " + self.name)
            return

        sql_command = "INSERT INTO player_game VALUES (" + str(player_id) + ", " + str(self.game_id) + ", " + str(self.goals) + ", " + str(self.assists) + ", " + str(start_bit) + ");"
        print("Player game sql command: " + sql_command)
        cursor = connection.cursor()
        cursor.execute(sql_command)
        connection.commit()