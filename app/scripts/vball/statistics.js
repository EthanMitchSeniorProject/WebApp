import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"rotation_jsx": null};
        this.most_recent_rotation = props.rotation;
        this.most_recent_game = props.game;
    }

    getStatsSelectedTeam = () => {
        if ((this.state.rotation_jsx != null) && (this.props.rotation == this.most_recent_rotation) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.rotation == 0) || (this.props.team == "") || (this.props.game == 0)) {
            return;
        }

        this.most_recent_rotation = this.props.rotation;
        this.most_recent_game = this.props.game;
        this.most_recent_game_id = this.getGameId();

        $.getJSON("/vball/teams/" + this.props.team + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/' + this.props.rotation + '/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
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
                )})
                console.log(response_arr);
            });
        });
    }

    getTeamName = () => {
        if (this.props.game == 0) {
            return "";
        }
        let second_index = this.props.game.search(" 2");
        let first_index = this.props.game.search(":");
        return this.props.game.slice(first_index+1, second_index);
    }

    getDate = () => {
        if (this.props.game == 0) {
            return "";
        }
        let length = this.props.game.length;
        let index = this.props.game.search(" 2");
        return this.props.game.slice(index, length+1);
    }

    getGameId = () => {
        if (this.props.game == 0) {
            return "";
        }
        let index = this.props.game.search(":");
        return this.props.game.slice(0, index);
    }

    render = () => {
        if ((this.props.rotation != 0) && (this.props.team != "") && (this.props.game != 0)) {
            this.getStatsSelectedTeam();
        }

        return (
            <div className={base_styles.statistics}>
                <div className={base_styles.statsHeader}>
                    <div className={base_styles.vballHeaderOne}>
                        <h3>Team: </h3>
                        <h3>{this.props.team}</h3>
                        <h3>Opposing Team: </h3>
                        <h3>{this.getTeamName()}</h3>
                        <h3>Date: </h3>
                        <h3>{this.getDate()}</h3>
                    </div>
                    <div className={base_styles.vballHeaderTwo}>
                        <h3>Server: </h3>
                        <h3>temp</h3>
                        <h3>Rotation: </h3>
                        <h3>{this.props.rotation}</h3>
                    </div>
                </div>
                <div className={base_styles.tableHeader}>
                    <h2 className={base_styles.tableHeaderOne}>{this.props.team}</h2>
                    <h2 className={base_styles.tableHeaderTwo}>{this.getTeamName()}</h2>
                </div>
                <div className={base_styles.tableSection}>
                    {this.state.rotation_jsx}
                </div>
            </div>
        );
    }
}

export default Statistics;