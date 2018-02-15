import React from 'react';
import ReactDOM from 'react-dom';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }

    render = () => {
        return (
            <div className={base_styles.statistics}>
                <h1 className={base_styles.vballHeader}>Team: </h1>
                <h1 className={base_styles.vballHeader}>{this.props.team}</h1>
                <h1 className={base_styles.vballHeader}>Rotation: </h1>
                <h1 className={base_styles.vballHeader}>{this.props.rotation}</h1>
            </div>
        );
    }
}

export default Statistics;