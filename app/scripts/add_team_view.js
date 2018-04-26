import React from 'react';
import ReactDOM from 'react-dom';

import base_styles from '../css/base.css';

class AddTeamView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }

    handleSubmit = () => {
        console.log("Submit button clicked");
    }

    render = () => {
        return (
            <div className={base_styles.add_team_view}>
                <div className={base_styles.add_team_instructions}>
                    <div className={base_styles.instructions_vball}>
                        <h3 className={base_styles.add_teamh3}>Volleyball Example</h3>
                        <h4 className={base_styles.add_teamh4}>School Name: Calvin College</h4>
                        <h4 className={base_styles.add_teamh4}>URL: http://calvinknights.com/sports/wvball/2017-18/schedule</h4>
                    </div>
                    <div>
                        <h3 className={base_styles.add_teamh3}>Soccer Example</h3>
                        <h4 className={base_styles.add_teamh4}>School Name: Calvin College</h4>
                        <h4 className={base_styles.add_teamh4}>URL: http://calvinknights.com/sports/msoc/2017-18/teams/calvin</h4>
                    </div>
                </div>
                <div className={base_styles.add_team_form}>
                    <h2>Add Team to Scouting Report</h2>
                    <select className={base_styles.sportSelector}>
                        <option value="">--</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Volleyball">Volleyball</option>
                    </select><br></br>
                    <h3>Enter Name of School:</h3>
                    <input className={base_styles.inputTeamNameItem} type="text" name="Team Name"/>
                    <h3>Enter Website URL of School:</h3>
                    <input className={base_styles.inputTeamURLItem} type="text" name="Team URL"/>
                    <br></br>
                    <button className={base_styles.add_team_submit_button} onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddTeamView;