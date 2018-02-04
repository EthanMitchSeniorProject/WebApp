import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/base.css';

class PlayersView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"player_jsx": null}
        this.most_recent_team = props.team;
    }

    getPlayers = () => {
        if ((this.state.player_jsx != null) && (this.props.team == this.most_recent_team)) {
            return;
        }

        this.most_recent_team = this.props.team;

        $.getJSON('/soccer/teams/' + this.props.team + '/team_id', (response_arr) => {
            let team_id = response_arr[0]['id'];
            $.getJSON('/soccer/teams/' + team_id + '/players', (player_list) => {
                console.log("players: " + JSON.stringify(player_list));
                this.setState({player_jsx: 
                 (
                    <div className="player_table_div">
                        <table className="player_table">
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                            </tr>
                            {
                                player_list.map(function(player_json) {
                                    return (
                                        <tr>
                                            <td>{player_json['name']}</td>
                                            <td>{player_json['num']}</td>
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
            </div>
        )
    }
}

export default PlayersView;