import React from 'react';
import ReactDOM from 'react-dom';

import base_styles from '../../css/base.css';

import Selector from './selector.js';
import Statistics from './statistics.js';

class VballView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {team: "No Team Selected", rotation: 0}
    }

    setTeamState = (event) => {
        this.setState({team: event.target.value});
    }

    setRotationState = (event) => {
        this.setState({rotation: event.target.value});
    }

    render = () => {
        return (
            <div className={base_styles.vballView}>
                <Selector setTeam={this.setTeamState} setRotation={this.setRotationState}/>
                <Statistics team={this.state.team} rotation={this.state.rotation}/>
            </div>
        )
    }
}

export default VballView;