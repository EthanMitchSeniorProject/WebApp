import React from 'react';
import $ from 'jquery';
import styles from '../../css/base.css';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"game_jsx": null};
        this.most_recent_team = props.team;
    }

    findGames = () => {
        if ((this.state.game_jsx != null) && (this.props.team == this.most_recent_team)) {
            return;
        }

        this.most_recent_team = this.props.team;

        $.getJSON("/soccer/teams/" + this.props.team + "/team_id", (response_arr) => {
            let team_id = response_arr[0]['id'];
            $.getJSON("/soccer/teams/" + team_id + "/games", (game_arr) => {
                console.log("Game response: " + JSON.stringify(game_arr));
                this.setState({game_jsx:
                    <div className="game_table_div">
                        <table className="game_table">
                            <tbody>
                                <tr>
                                    <th>Opponent</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                    <th>View More Detail</th>
                                </tr>
                                {
                                    game_arr.map( (game_json) => {
                                        return (
                                            <tr>
                                                <td>{game_json["opponent"]}</td>
                                                <td>Todo</td>
                                                <td>Todo</td>
                                                <button className="moreDetailGame">View Game Detail</button>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                });
            });
        });
    }

    render = () => {
        if (this.props.team == "") {
            return null;
        }

        this.findGames();

        return (
            <div className="game_view">
                <h1>{this.props.team}: Games</h1>
                <div className="games">
                    {this.state.game_jsx}
                </div>
            </div>
        );
    }
}

export default GameView;