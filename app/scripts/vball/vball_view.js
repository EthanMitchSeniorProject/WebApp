import React from 'react';
import ReactDOM from 'react-dom';

import base_styles from '../../css/base.css';

import Selector from './selector.js';
import Statistics from './statistics.js';

class VballView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {team: "", game: "", serverList: ""}
    }

    setTeamState = (event) => {
        console.log("Team: " + event.target.value);
        this.setState({team: event.target.value});
    }

    setGameState = (event) => {
        this.setState({game: event.target.value});
    }

    render = () => {
        return (
            <div className={base_styles.vballView}>
                <Selector setTeam={this.setTeamState} setGame={this.setGameState}/>
                <Statistics team={this.state.team} rotation={this.state.rotation} game={this.state.game}/>
            </div>
        )
    }
}

export default VballView;