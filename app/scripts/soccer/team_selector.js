import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/drop_down.css';

class TeamSelector extends React.Component {
    getAllTeams = () => {
        let render_teams = [];
        $.getJSON("/soccer/teams", function (teams) {
            for (var i = 0; i < teams.length; i++) {
                let current_team = teams[i];
                console.log("/soccer/teams/" + current_team['id'] + "/games");
                $.getJSON("/soccer/teams/" + current_team['id'] + "/games", function(games) {
                    if (games.length > 5) {
                        render_teams.push(current_team['school_name']);
                        console.log("Adding" + current_team['school_name'] + " with " + games.length + " games");
                    } else {
                        console.log("Not adding " + current_team['school_name'] + " with " + games.length + " games");
                    }
                });
            }
        });
        //make request to soccer/teams
        //for each item, add <a href="#">Team</a>
        return (
            <h1>Hi</h1>
        )
    }

    render = () => {
        return (
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Select Team</button>
                <div className={styles.dropdown_content}>
                    {this.getAllTeams()}
                </div>
            </div>
        )
    }
}

export default TeamSelector;