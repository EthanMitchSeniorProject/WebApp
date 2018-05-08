import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TeamSelector from './team_selector.js';
import GameSelector from './game_selector.js';

import base_styles from '../../css/base.css';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {team: ""};
    }

    setTeam = (e) => {
        console.log("SETTING TEAM");
        this.props.setTeam(e);
        this.setState({"team": e.target.value});
    }

    render = () => {
        return (
            <div className={base_styles.selector}>
                <TeamSelector setTeam={this.setTeam}/>
                <GameSelector setGame={this.props.setGame} team={this.state.team}/>
            </div>
        );
    }
}

export default Selector;