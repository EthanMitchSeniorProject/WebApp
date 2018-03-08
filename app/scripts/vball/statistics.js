import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"rotationSelected_jsx": null, "rotationOpposing": null};
        this.most_recent_rotation = props.rotation;
        this.most_recent_game = props.game;
    }

    getStatsSelectedTeam = () => {
        if ((this.state.rotationSelected_jsx != null) && (this.props.rotation == this.most_recent_rotation) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.rotation == 0) || (this.props.team == "No Team Selected") || (this.props.game == 0)) {
            return;
        }

        this.most_recent_rotation = this.props.rotation;
        this.most_recent_game = this.props.game;
        this.most_recent_game_id = this.getGameId();

        $.getJSON('/vball/teams/' + this.props.rotation + '/totals/' + this.most_recent_game_id, (response) => {
            let total = response[0]['COUNT'];
            $.getJSON('/vball/teams/' + this.props.rotation + '/split/' + this.most_recent_game_id, (response_arr) => {
                this.setState({rotationSelected_jsx:
                (
                    <table className={base_styles.tableOne}>
                        <tbody>
                            <tr>
                                <th>Result</th>
                                <th>Percentage</th>
                                <th>Amount</th>
                            </tr>
                            {
                                response_arr.map( (individual_rotation) => {
                                    return (
                                        <tr>
                                            <td>{individual_rotation['result']}</td>
                                            <td>{Math.round((individual_rotation['COUNT'] / total) * 100)}%</td>
                                            <td>{individual_rotation['COUNT']}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td>TOTAL</td>
                                <td>100%</td>
                                <td>{total}</td>
                            </tr>
                        </tbody>
                    </table>
                )
                });
                console.log(response_arr);
            });
            console.log(total);
        });
    }

    getStatsOpposingTeam = () => {
        if ((this.state.rotationOpposing_jsx != null) && (this.props.rotation == this.most_recent_rotation) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.rotation == 0) || (this.props.team == "No Team Selected") || (this.props.game == 0)) {
            return;
        }

        this.most_recent_rotation = this.props.rotation;
        this.most_recent_game = this.props.game;
        this.most_recent_game_id = this.getGameId();

        $.getJSON('/vball/teams/' + this.props.rotation + '/totals/' + this.most_recent_game_id, (response) => {
            let total = response[0]['COUNT'];
            $.getJSON('/vball/teams/' + this.props.rotation + '/split/' + this.most_recent_game_id, (response_arr) => {
                this.setState({rotationOpposing_jsx:
                (
                    <table className={base_styles.tableTwo}>
                        <tbody>
                            <tr>
                                <th>Result</th>
                                <th>Percentage</th>
                                <th>Amount</th>
                            </tr>
                            {
                                response_arr.map( (individual_rotation) => {
                                    return (
                                        <tr>
                                            <td>{individual_rotation['result']}</td>
                                            <td>{Math.round((individual_rotation['COUNT'] / total) * 100)}%</td>
                                            <td>{individual_rotation['COUNT']}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td>TOTAL</td>
                                <td>100%</td>
                                <td>{total}</td>
                            </tr>
                        </tbody>
                    </table>
                )
                });
                console.log(response_arr);
            });
            console.log(total);
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
            this.getStatsOpposingTeam();
        }

        return (
            <div className={base_styles.statistics}>
                <div className={base_styles.statsHeader}>
                    <h3 className={base_styles.vballHeaderOne}>Team: </h3>
                    <h3 className={base_styles.vballHeaderOne}>{this.props.team}</h3>
                    <h3 className={base_styles.vballHeaderOne}>Opposing Team: </h3>
                    <h3 className={base_styles.vballHeaderOne}>{this.getTeamName()}</h3>
                    <h3 className={base_styles.vballHeaderTwo}>Game ID: </h3>
                    <h3 className={base_styles.vballHeaderTwo}>{this.getGameId()}</h3>
                    <h3 className={base_styles.vballHeaderTwo}>Date: </h3>
                    <h3 className={base_styles.vballHeaderTwo}>{this.getDate()}</h3>
                    <h3 className={base_styles.vballHeaderTwo}>Rotation: </h3>
                    <h3 className={base_styles.vballHeaderTwo}>{this.props.rotation}</h3>
                </div>
                <div className={base_styles.tableHeader}>
                    <h4 className={base_styles.tableHeaderOne}>{this.props.team}</h4>
                    <h4 className={base_styles.tableHeaderTwo}>{this.getTeamName()}</h4>
                </div>
                <div className={base_styles.tableSection}>
                    {this.state.rotationSelected_jsx}
                    {this.state.rotationOpposing_jsx}
                </div>
            </div>
        );
    }
}

export default Statistics;