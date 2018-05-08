import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"rotation_jsxOne": null, "rotation_jsxTwo": null, "rotation_jsxThree": null, "rotation_jsxFour": null, 
                    "rotation_jsxFive": null, "rotation_jsxSix": null, "displayServersListOne": "", "displayServersListTwo": "",
                    "displayServersListThree": "", "displayServersListFour": "", "displayServersListFive": "", "displayServersListSix": "",
                    "displayRotationOneHeaders": "", "displayRotationTwoHeaders": "", "displayRotationThreeHeaders": "",
                    "displayRotationFourHeaders": "", "displayRotationFiveHeaders": "", "displayRotationSixHeaders": "",
                    "displayRotationOneHeadersReceiving": "", "displayRotationTwoHeadersReceiving": "", "displayRotationThreeHeadersReceiving": "",
                    "displayRotationFourHeadersReceiving": "", "displayRotationFiveHeadersReceiving": "", "displayRotationSixHeadersReceiving": ""};
        this.most_recent_game = props.game;
    }

    getStatsSelectedTeamOne = () => {
        if ((this.state.rotation_jsxOne != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/1/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/1/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 1 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 1 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxOne:
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
                        ), displayServersListOne: serversList, displayRotationOneHeaders: "Serving", displayRotationOneHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getStatsSelectedTeamTwo = () => {
        if ((this.state.rotation_jsxTwo != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/2/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/2/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 2 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 2 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxTwo:
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
                        ), displayServersListTwo: serversList, displayRotationTwoHeaders: "Serving", displayRotationTwoHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getStatsSelectedTeamThree = () => {
        if ((this.state.rotation_jsxThree != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/3/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/3/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 3 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 3 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxThree:
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
                        ), displayServersListThree: serversList, displayRotationThreeHeaders: "Serving", displayRotationThreeHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getStatsSelectedTeamFour = () => {
        if ((this.state.rotation_jsxFour != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/4/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/4/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 4 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 4 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxFour:
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
                        ), displayServersListFour: serversList, displayRotationFourHeaders: "Serving", displayRotationFourHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getStatsSelectedTeamFive = () => {
        if ((this.state.rotation_jsxFive != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/5/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/5/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 5 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 5 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxFive:
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
                        ), displayServersListFive: serversList, displayRotationFiveHeaders: "Serving", displayRotationFiveHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getStatsSelectedTeamSix = () => {
        if ((this.state.rotation_jsxSix != null) && (this.props.game == this.most_recent_game)) {
            return;
        }

        if ((this.props.team == "") || (this.props.game == "")) {
            return;
        }

        this.most_recent_game_id = this.getGameId();

        let team_name = this.displaySelectedTeamName();

        $.getJSON("/vball/teams/" + team_name + "/team_id", (id) => {
            let selected_team_id = id[0]['id'];
            $.getJSON('/vball/teams/6/split/' + this.most_recent_game_id, (response_arr) => {

                var selectedTeamArray = [];
                var opposingTeamArray = [];
    
                response_arr.forEach(element => {
                    if (element['winning_team_point'] == selected_team_id) {
                        selectedTeamArray.push(element);
                    } else {
                        opposingTeamArray.push(element);
                    }
                });

                $.getJSON('/vball/teams/6/' + this.most_recent_game_id + '/' + selected_team_id + '/servers', (server_arr) => {
                    var serversList = "Rotation 6 Server(s):";
                    server_arr.forEach(server => {
                        if (serversList == "Rotation 6 Server(s):") {
                            serversList += " " + server['name'];
                        } else {
                            serversList = serversList + ", " + server['name'];
                        }
                    });

                    this.setState({rotation_jsxSix:
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
                        ), displayServersListSix: serversList, displayRotationSixHeaders: "Serving", displayRotationSixHeadersReceiving: "Receiving"})
                });
            });
        });
    }

    getTeamNameOpponent = () => {
        if (this.props.game == "") {
            return "";
        }
        let second_index = this.props.game.search(" 2");
        let first_index = this.props.game.search(":");
        return this.props.game.slice(first_index+1, second_index);
    }

    displaySelectedTeamName = () => {
        if (this.props.team == "") {
            return "";
        }

        let length = this.props.team.length;
        let first_index = this.props.team.search(": ");
        return this.props.team.slice(first_index+2, length+1);
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
            this.getStatsSelectedTeamOne();
            this.getStatsSelectedTeamTwo();
            this.getStatsSelectedTeamThree();
            this.getStatsSelectedTeamFour();
            this.getStatsSelectedTeamFive();
            this.getStatsSelectedTeamSix();
            this.most_recent_game = this.props.game;
        }

        return (
            <div className={base_styles.statistics}>
                <h2>Rotation Statistics</h2>
                <div className={base_styles.statsHeader}>
                    <table className={base_styles.vballHeader}>
                        <tbody>
                            <tr>
                                <th>Team</th>
                                <td>{this.displaySelectedTeamName()}</td>
                                <th>Opponent</th>
                                <td>{this.getTeamNameOpponent()}</td>
                                <th>Date</th>
                                <td>{this.getDate()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={base_styles.tableSectionLineOne}>
                    <div className={base_styles.RotationOne}>
                        <div className={base_styles.vballServersOne}>
                            <h4>{this.state.displayServersListOne}</h4>
                        </div>
                        <div className={base_styles.vballRotationOneHeaders}>
                            <h5>{this.state.displayRotationOneHeaders}</h5>
                            <h5>{this.state.displayRotationOneHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionOne}>
                            {this.state.rotation_jsxOne}
                        </div>
                    </div>
                    <div className={base_styles.RotationTwo}>
                        <div className={base_styles.vballServersTwo}>
                            <h4>{this.state.displayServersListTwo}</h4>
                        </div>
                        <div className={base_styles.vballRotationTwoHeaders}>
                            <h5>{this.state.displayRotationTwoHeaders}</h5>
                            <h5>{this.state.displayRotationTwoHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionTwo}>
                            {this.state.rotation_jsxTwo}
                        </div>
                    </div>
                </div>
                <div className={base_styles.tableSectionLineTwo}>
                    <div className={base_styles.RotationThree}>
                        <div className={base_styles.vballServersThree}>
                            <h4>{this.state.displayServersListThree}</h4>
                        </div>
                        <div className={base_styles.vballRotationThreeHeaders}>
                            <h5>{this.state.displayRotationThreeHeaders}</h5>
                            <h5>{this.state.displayRotationThreeHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionThree}>
                            {this.state.rotation_jsxThree}
                        </div>
                    </div>
                    <div className={base_styles.RotationFour}>
                        <div className={base_styles.vballServersFour}>
                            <h4>{this.state.displayServersListFour}</h4>
                        </div>
                        <div className={base_styles.vballRotationFourHeaders}>
                            <h5>{this.state.displayRotationFourHeaders}</h5>
                            <h5>{this.state.displayRotationFourHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionFour}>
                            {this.state.rotation_jsxFour}
                        </div>
                    </div>
                </div>
                <div className={base_styles.tableSectionLineThree}>
                    <div className={base_styles.RotationFive}>
                        <div className={base_styles.vballServersFive}>
                            <h4>{this.state.displayServersListFive}</h4>
                        </div>
                        <div className={base_styles.vballRotationFiveHeaders}>
                            <h5>{this.state.displayRotationFiveHeaders}</h5>
                            <h5>{this.state.displayRotationFiveHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionFive}>
                            {this.state.rotation_jsxFive}
                        </div>
                    </div>
                    <div className={base_styles.RotationSix}>
                        <div className={base_styles.vballServersSix}>
                            <h4>{this.state.displayServersListSix}</h4>
                        </div>
                        <div className={base_styles.vballRotationSixHeaders}>
                            <h5>{this.state.displayRotationSixHeaders}</h5>
                            <h5>{this.state.displayRotationSixHeadersReceiving}</h5>
                        </div>
                        <div className={base_styles.tableSectionSix}>
                            {this.state.rotation_jsxSix}
                        </div>
                    </div>
                </div>              
            </div>
        );
    }
}

export default Statistics;