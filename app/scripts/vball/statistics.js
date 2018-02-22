import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../../css/base.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"rotation_jsx": null};
        this.most_recent_rotation = props.rotation;
    }

    getStats = () => {
        if ((this.state.rotation_jsx != null) && (this.props.rotation == this.most_recent_rotation)) {
            return;
        }

        if ((this.props.rotation == 0) || (this.props.team == "No Team Selected")) {
            return;
        }

        this.most_recent_rotation = this.props.rotation;

        $.getJSON('/vball/teams/' + this.props.rotation, (response) => {
            let total = response[0]['COUNT'];
            $.getJSON('/vball/teams/' + this.props.rotation + '/split', (response_arr) => {
                this.setState({rotation_jsx:
                (
                    <table className={base_styles.tableSection}>
                        <tbody>
                            <tr>
                                <th>Result</th>
                                <th>Percentage</th>
                                <th>Amount</th>
                            </tr>
                            {
                                response_arr.map( (individual_rotation) => {
                                    return (
                                        <tr>
                                            <td>{individual_rotation['result']}</td>
                                            <td>{Math.round((individual_rotation['COUNT'] / total) * 100)}%</td>
                                            <td>{individual_rotation['COUNT']}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td>TOTAL</td>
                                <td>100%</td>
                                <td>{total}</td>
                            </tr>
                        </tbody>
                    </table>
                )
                });
                console.log(response_arr);
            });
            console.log(total);
        });
    }

    render = () => {
        if ((this.props.rotation == 0) || (this.props.team == "No Team Selected") || (this.props.game == 0)) {
            return null;
        }

        this.getStats();

        return (
            <div className={base_styles.statistics}>
                <div className={base_styles.statsHeader}>
                    <h1 className={base_styles.vballHeader}>Team: </h1>
                    <h1 className={base_styles.vballHeader}>{this.props.team}</h1>
                    <h1 className={base_styles.vballHeader}>Game: </h1>
                    <h1 className={base_styles.vballHeader}>{this.props.game}</h1>
                    <h1 className={base_styles.vballHeader}>Rotation: </h1>
                    <h1 className={base_styles.vballHeader}>{this.props.rotation}</h1>
                </div>
                <div className={base_styles.tableSection}>
                    {this.state.rotation_jsx}
                </div>
            </div>
        );
    }
}

export default Statistics;