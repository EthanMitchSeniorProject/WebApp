import React from 'react';
import $ from 'jquery';
import styles from '../../css/base.css';
import GameScore from './game_score.js';
import DateFormatter from '../date_formatter.js';
import GameModal from './game_modal.js';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"game_jsx": null, "game_scores": {}, "game_modal_id": null};
        this.most_recent_team = props.team;
    }

    findGames = () => {
        if ((this.state.game_jsx != null) && (this.props.team == this.most_recent_team)) {
            return;
        }

        this.most_recent_team = this.props.team;

        $.getJSON("/soccer/teams/" + this.props.team + "/team_id", (response_arr) => {
            this.state.team_id = response_arr[0]['id'];
            let team_id = this.state.team_id;
            $.getJSON("/soccer/teams/" + team_id + "/games", (game_arr) => {
                console.log("Game response: " + JSON.stringify(game_arr));

                let gameDateComparator = (a, b) => {
                    let a_date = new Date(DateFormatter.formatDateForSorting(a["date"]));
                    let b_date = new Date(DateFormatter.formatDateForSorting(b["date"]));
                    return a_date.valueOf() - b_date.valueOf();
                }

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
                                    game_arr.sort(gameDateComparator).map( (game_json) => {
                                        return (
                                            <tr>
                                                <td>{game_json["opponent"]}</td>
                                                <GameScore game_id={game_json["id"]} team_id={team_id}/>
                                                <td>{DateFormatter.formatDate(game_json["date"])}</td>
                                                <td><button className="viewGameDetail" value={game_json["id"]} onClick={this.showGameModal}>View Game Detail</button></td>
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

    showGameModal = (event) => {
       console.log("Render modal here..." + event.target.value);
       this.setState({game_modal_id: event.target.value});
    }

    findScore = (game_id) => {
        //We actually need to create a new game score react component to handle this ish
        $.getJSON("/soccer/games/" + game_id + "/score", (score_json) => {
            let selected_team_score = 0;
            let opponent_score = 0;

            for (var i = 0; i < score_json.length; i++) {
                let score_object = score_json[i];
                if (team_id == score_object["team_id"]) {
                    selected_team_score = score_object["goals"];
                } else {
                    opponent_score = score_object["goals"];
                }
            }
            
            this.state.game_scores[game_id] = selected_team_score + " - " + opponent_score;
        })
    }
    
    getGameModal = () => {
        if (this.state.game_modal_id == null) {
            return null;
        }

        return (
            <GameModal game_id={this.state.game_modal_id} selected_team_id={this.state.team_id}/>
        )
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
                <div className="gameModal">
                    {this.getGameModal()}
                </div>
            </div>
        );
    }
}

export default GameView;