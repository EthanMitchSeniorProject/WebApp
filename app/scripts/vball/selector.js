import React from 'react';
import ReactDOM from 'react-dom';

import base_styles from '../../css/base.css';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }

    render = () => {
        return (
            <div className={base_styles.selector}>
                <h1>Select Features</h1>
                <label className={base_styles.teamSelectorLabel}>Team</label>
                <select className={base_styles.teamSelector} onChange={this.props.setTeam}>
                    <option value="No Team Selected">--</option>
                    <option value="Calvin College">Calvin College</option>
                </select>
                <label className={base_styles.gameSelectorLabel}>Game</label>
                <select className={base_styles.gameSelector} onChange={this.props.setGame}>
                    <option value="0">--</option>
                    <option value="1">1</option>
                </select>
                <label className={base_styles.rotationSelectorLabel}>Rotation</label>
                <select className={base_styles.rotationSelector} onChange={this.props.setRotation}>
                    <option value="0">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        );
    }
}

export default Selector;