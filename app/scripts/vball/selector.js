import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {games: []};
        this.getAllGames();
    }

    getAllGames = () => {
        console.log("Adding games...");
        let current_team_id = 0;
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
        return this.state.games.map(function(game) {
            return (
                <option>{game}</option>
            )
        })
    }

    render = () => {
        return (
            <div className={base_styles.selector}>
                <h1>Select Features</h1>
                <label className={base_styles.teamSelectorLabel}>Team</label>
                <select className={base_styles.teamSelector} onChange={this.props.setTeam}>
                    <option value="">--</option>
                    <option value="Calvin">Calvin</option>
                </select>
                <label className={base_styles.gameSelectorLabel}>Game</label>
                <select className={base_styles.gameSelector} onChange={this.props.setGame}>
                    <option value="0">--</option>
                    {this.renderGames()}
                </select>
                <label className={base_styles.rotationSelectorLabel}>Rotation</label>
                <select className={base_styles.rotationSelector} onChange={this.props.setRotation}>
                    <option value="0">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        );
    }
}

export default Selector;