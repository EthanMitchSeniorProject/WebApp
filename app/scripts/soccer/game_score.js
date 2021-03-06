import React from 'react';
import $ from 'jquery';
import styles from '../../css/base.css';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {score_jsx: null, previous_game_id: null, previous_team_id: null};
    }

    getScore = () => {
        if (this.state.score_jsx != null && this.props.game_id == this.state.previous_game_id) {
            return;
        }

        this.state.previous_game_id = this.props.game_id;
        this.state.previous_team_id = this.props.team_id;

        $.getJSON("/soccer/games/" + this.props.game_id + "/score", (score_json) => {
            console.log("score json" + JSON.stringify(score_json));
            var team_score = 0;
            var opponent_score = 0;

            for (var i = 0; i < score_json.length; i++) {
                let score_object = score_json[i];

                if (score_object.team_id == this.props.team_id) {
                    team_score = score_object["goals"];
                } else {
                    opponent_score = score_object["goals"];
                }
            }

            let score_string = team_score + " - " + opponent_score;

            this.setState({score_jsx: (
                <td>{score_string}</td>
            )})
        })
    }

    render = () => {
        this.getScore();

        return this.state.score_jsx;
    }
}

export default GameView;