import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/base.css';
import TrendModal from './trend_modal.js';

class PlayersView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"player_jsx": null, "player_id_modal": null};
        this.most_recent_team = props.team;
    }

    viewPlayerTrendModal = (event) => {
        console.log("Click to view player trend modal!");
        this.setState({player_id_modal: event.target.value});
    }

    getPlayers = () => {
        if ((this.state.player_jsx != null) && (this.props.team == this.most_recent_team)) {
            return;
        }

        this.most_recent_team = this.props.team;

        $.getJSON('/soccer/teams/' + this.props.team + '/team_id', (response_arr) => {
            let team_id = response_arr[0]['id'];
            $.getJSON('/soccer/teams/' + team_id + '/players', (player_list) => {
                this.setState({player_jsx: 
                 (
                    <div className="player_table_div">
                        <table className="player_table">
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Games Played</th>
                                <th>Games Started</th>
                                <th>Yellow Cards</th>
                                <th>Red Cards</th>
                                <th>Goals</th>
                                <th>Assists</th>
                                <th>Trend</th>
                            </tr>
                            {
                                player_list.map( (player_json) => {
                                    return (
                                        <tr>
                                            <td>{player_json['name']}</td>
                                            <td>{player_json['num']}</td>
                                            <td>{player_json['games_played']}</td>
                                            <td>{player_json['games_started']}</td>
                                            <td>{player_json['yellow_cards']}</td>
                                            <td>{player_json['red_cards']}</td>
                                            <td>{player_json['goals']}</td>
                                            <td>{player_json['assists']}</td>
                                            <td><button value={player_json['id']}className="viewPlayerTrend" onClick={this.viewPlayerTrendModal}>View Trend</button></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )                  
                });
            });
        });
    }

    getPlayerModal = () => {
        if (this.state.player_id_modal == null) {
            return null;
        }

        return (
            <TrendModal player_id={this.state.player_id_modal}/>
        )
    }

    render = () => {
        if (this.props.team == "") {
            return null;
        }

        this.getPlayers();

        return (
            <div className="playersView">
                <h1>{this.props.team}: Players</h1>
                <div className="players">
                    {this.state.player_jsx}
                </div>
                <div className="playerModal">
                    {this.getPlayerModal()}
                </div>
            </div>
        )
    }
}

export default PlayersView;