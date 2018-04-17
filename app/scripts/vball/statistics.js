import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"rotation_jsx": null, "displayServersList": ""};
        this.most_recent_game = props.game;
    }

    getStatsSelectedTeam = (rotation_num) => {
        if ((this.state.rotation_jsx != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game = this.props.game;
        this.most_recent_game_id = this.getGameId();

        $.getJSON("/vball/teams/" + this.props.team + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/' + rotation_num + '/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/' + rotation_num + '/' + this.most_recent_game_id + '/servers', (server_arr) => {
                    var serversList = "";
                    server_arr.forEach(server => {
                        if (serversList == "") {
                            serversList += server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsx:
                        (
                            <div className={base_styles.tables}>
                                <table className={base_styles.tableOne}>
                                    <tbody>
                                        <tr>
                                            <th>Result</th>
                                            <th>Amount</th>
                                        </tr>
                                        {
                                            selectedTeamArray.map( (individual_rotation) => {
                                                return (
                                                    <tr>
                                                        <td>{individual_rotation['result']}</td>
                                                        <td>{individual_rotation['COUNT']}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <table className={base_styles.tableTwo}>
                                    <tbody>
                                        <tr>
                                            <th>Result</th>
                                            <th>Amount</th>
                                        </tr>
                                        {
                                            opposingTeamArray.map( (individual_rotation) => {
                                                return (
                                                    <tr>
                                                        <td>{individual_rotation['result']}</td>
                                                        <td>{individual_rotation['COUNT']}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ), displayServersList: serversList})
                });
            });
        });
    }

    getTeamName = () => {
        if (this.props.game == "") {
            return "";
        }
        let second_index = this.props.game.search(" 2");
        let first_index = this.props.game.search(":");
        return this.props.game.slice(first_index+1, second_index);
    }

    getDate = () => {
        if (this.props.game == "") {
            return "";
        }
        let length = this.props.game.length;
        let index = this.props.game.search(" 2");
        return this.props.game.slice(index, length+1);
    }

    getGameId = () => {
        if (this.props.game == "") {
            return "";
        }
        let index = this.props.game.search(":");
        return this.props.game.slice(0, index);
    }

    render = () => {
        if ((this.props.team != "") && (this.props.game != "")) {
            this.getStatsSelectedTeam(1);
            this.getStatsSelectedTeam(2);
            this.getStatsSelectedTeam(3);
            this.getStatsSelectedTeam(4);
            this.getStatsSelectedTeam(5);
            this.getStatsSelectedTeam(6);
        }

        return (
            <div className={base_styles.statistics}>
                <h2>Rotation Statistics</h2>
                <div className={base_styles.statsHeader}>
                    <table className={base_styles.vballHeader}>
                        <tbody>
                            <tr>
                                <th>Team</th>
                                <td>{this.props.team}</td>
                                <th>Opponent</th>
                                <td>{this.getTeamName()}</td>
                                <th>Date</th>
                                <td>{this.getDate()}</td>
                                <th>Rotation</th>
                                <td>{this.props.rotation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={base_styles.tableSection}>
                    {this.state.rotation_jsx}
                </div>
            </div>
        );
    }
}

export default Statistics;