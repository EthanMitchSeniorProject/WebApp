import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../../css/base.css';

class StarterView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {"starter_jsx": null};
        this.most_recent_team = props.team;
    }

    getStarters = () => {
        if ((this.state.starter_jsx != null) && (this.props.team == this.most_recent_team)) {
            return;
        }

        this.most_recent_team = this.props.team;

        $.getJSON('/soccer/teams/' + this.props.team + '/team_id', (response_arr) => {
            let team_id = response_arr[0]['id'];
            $.getJSON('/soccer/teams/' + team_id + '/starters', (starter_list) => {
                this.setState({starter_jsx: 
                 (
                    <div className={styles.starter_table_div}>
                        <table className={styles.starter_table}>
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                            </tr>
                            {
                                //starter_list.filter(player_json => player_json['starting_ratio'] == 1).map(function(player_json) {
                                starter_list.filter(player_json => player_json['starting_ratio'] == 1).map(function(player_json) {
                                    return (
                                        <tr>
                                            <td>{player_json['name']}</td>
                                            <td>{player_json['num']}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )                  
                });
            });
        });
    }

    render = () => {
        if (this.props.team == "") {
            return null;
        }

        this.getStarters();

        return (
            <div className="starterView">
                <h1 className={styles.starter_header}>{this.props.team}: Consistent Starters</h1>
                <div className="starters">
                    {this.state.starter_jsx}
                </div>
            </div>
        )
    }
}

export default StarterView;