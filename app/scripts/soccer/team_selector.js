import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/drop_down.css';

class TeamSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.getAllTeams = this.getAllTeams.bind(this);
        this.state = {teams: []};
        this.getAllTeams();
    }

    getAllTeams = () => {
        let render_teams = [];
        $.getJSON("/soccer/teams", (teams) => {
            for (var i = 0; i < teams.length; i++) {
                let current_team = teams[i];
                console.log("/soccer/teams/" + current_team['id'] + "/games");
                $.getJSON("/soccer/teams/" + current_team['id'] + "/games", (games) => {
                    if (games.length > 5) {
                        render_teams.push(current_team['school_name']);
                        console.log("Adding" + current_team['school_name'] + " with " + games.length + " games");
                        let newTeams = this.state.teams;
                        this.state.teams.push(current_team['school_name']);
                        this.setState({"teams" : newTeams});
                    } else {
                        console.log("Not adding " + current_team['school_name'] + " with " + games.length + " games");
                    }
                });
            }
        });
    }


    renderTeams = () => {
        return this.state.teams.map(function(team) {
            console.log("rendering: " + team);
            return (
                <input className="select_button" type="submit" value={team}/>
            )
        })
    }

    render = () => {
        return (
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Select Team</button>
                <div className={styles.dropdown_content}>
                    {this.renderTeams()}
                </div>
            </div>
        )
    }
}

export default TeamSelector;