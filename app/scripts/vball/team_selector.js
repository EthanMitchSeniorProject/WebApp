import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class TeamSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {teams: []};
        this.getAllTeams();
    }

    getAllTeams = () => {
        $.getJSON("/vball/teams/with_routes", (teams) => {
            console.log(teams);

            for (var i = 0; i < teams.length; i++) {
                let current_team = teams[i];
                let current_team_id = current_team['id'];
                let current_team_name = current_team['school_name'];
                let option_entry = current_team_id + ": " + current_team_name;
                this.state.teams.push(option_entry);
                let newTeams = this.state.teams;
                this.setState({"teams": newTeams});
            }

            this.setState({"teams": response});
        });
    }

    renderTeams = () => {
        return this.state.teams.map(function(team) {
            return (
                <option>{team}</option>
            )
        })
    }

    render = () => {
        return(
            <div className={base_styles.selectorTeamSection}>
                <label className={base_styles.teamSelectorLabel}>Team</label>
                <select className={base_styles.teamSelector} onChange={this.props.setTeam}>
                    <option value="">--</option>
                    {this.renderTeams()}
                </select>
            </div>
        )
    }
}

export default TeamSelector;