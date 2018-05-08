import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import DateFormatter from '../date_formatter.js';

import base_styles from '../../css/base.css';

class GameSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {games: []};
        this.most_recent_team = props.team;
    }

    getAllGames = () => {
        if (this.props.team == this.most_recent_team) {
            return;
        }

        this.state.games = [];
        
        console.log("Adding games...");
        let current_team_id = this.getTeamID();
        $.getJSON("/vball/teams/" + current_team_id + "/games", (games) => {

            for (var i = 0; i < games.length; i++) {
                let current_game = games[i];
                let current_date = current_game['game_date'];
                let game_id = current_game['id'];
                let index = current_date.search('T');
                current_date = current_date.slice(0, index);
                let option_entry = "";
                if (current_game['home_team'] == current_team_id) {
                    $.getJSON("/vball/teams/" + current_game['away_team'] + "/team_name", (name) => {
                        option_entry = game_id + ": " + name[0]['school_name'] + " " + current_date;
                        this.state.games.push(option_entry);
                        let newGames = this.state.games;
                        this.setState({"games": newGames});
                    })
                } else {
                    $.getJSON("/vball/teams/" + current_game['home_team'] + "/team_name", (name) => {
                        option_entry = game_id + ": " + name[0]['school_name'] + " " + current_date;
                        this.state.games.push(option_entry);
                        let newGames = this.state.games;
                        this.setState({"games": newGames});
                    })
                }
            }
        })
    }

    renderGames = () => {
        let gameDateComparator = (a, b) => {
            let index = a.search(" 2");
            let length = a.length;
            let temp_a_date = a.slice(index, length+1);

            let index2 = b.search(" 2");
            let length2 = b.length;
            let temp_b_date = b.slice(index2, length2+1);

            let a_date = new Date(temp_a_date);
            let b_date = new Date(temp_b_date);

            return a_date.valueOf() - b_date.valueOf();
        }

        return this.state.games.sort(gameDateComparator).map(function(game) {
            return (
                <option>{game}</option>
            )
        })
    }

    getTeamID = () => {
        let index = this.props.team.search(":");
        console.log(this.props.team.slice(0, index));
        return this.props.team.slice(0, index);
    }

    render = () => {
        if (this.props.team != "") {
            this.getAllGames();
            this.most_recent_team = this.props.team;
        }

        return(
            <div className={base_styles.selectorGameSection}>
                <label className={base_styles.gameSelectorLabel}>Game</label>
                <select className={base_styles.gameSelector} onChange={this.props.setGame}>
                    <option value="">--</option>
                    {this.renderGames()}
                </select>
            </div>
        )
    }
}

export default GameSelector;