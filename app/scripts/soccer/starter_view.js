import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/drop_down.css';
import base_styles from '../../css/base.css';

class StarterView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }

    getStarters = () => {
        $.getJSON('/soccer/teams/' + this.props.team + '/team_id', (response_arr) => {
            let team_id = response_arr[0]['id'];
            $.getJSON('/soccer/teams/' + team_id + '/starters', (starter_list) => {
                console.log(starter_list);
            });
        });

        return (
            <p>Starters</p>
        )
    }

    render = () => {
        if (this.props.team == "") {
            return null;
        }

        return (
            <div className="starterView">
                <h1>{this.props.team}: Consistent Starters</h1>
                <div className="starters">
                    {this.getStarters()}
                </div>
            </div>
        )
    }
}

export default StarterView;