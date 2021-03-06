import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import base_styles from '../css/base.css';

class AddTeamView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {Sport: "", TeamName: "", TeamURL: "", alertStatus: ""};
    }

    handleSubmit = () => {
        this.setState({"alertStatus": ""});
        console.log("Submit button clicked");

        if (this.state.Sport == "" || this.state.TeamName == "" || this.state.TeamURL == "") {
            console.log("Please make sure all values are filled in...");
            this.setState({"alertStatus": "Please fill in all fields in the form"});
            return;
        }

        if (!this.state.TeamURL.startsWith("http://")) {
            console.log("Incorrect URL format...");
            this.setState({"alertStatus": "Incorrect URL format"});
            return;
        }

        if (this.state.TeamURL.search("/sports/") == -1) {
            console.log("Incorrect URL format...");
            this.setState({"alertStatus": "Incorrect URL format"});
            return;
        }

        if (this.state.TeamURL.search("/2017-18/") == -1) {
            console.log("Incorrect URL format...");
            this.setState({"alertStatus": "Incorrect URL format"});
            return;
        }

        if (!this.state.TeamURL.search("&r=0&pos=") == -1) {
            console.log("Incorrect URL format...");
            this.setState({"alertStatus": "Incorrect URL format"});
            return;
        }

        $.getJSON("/addTeam", {team_name: this.state.TeamName, team_url: this.state.TeamURL, sport: this.state.Sport}, (res) => {
            console.log(res);
            this.setState({"alertStatus": "Team Added Successfully"});
            $('input[name=TeamName').val('');
            $('input[name=TeamURL').val('');
            $('select[name=SportSelector').val('');
        });
    }

    updateTeamNameInputValue = (e) => {
        this.setState({"TeamName": e.target.value});
        console.log("Noticing Team Name Change...");
    }

    updateURLInputValue = (e) => {
        this.setState({"TeamURL": e.target.value});
        console.log("Noticing Team URL Change...");
    }

    updateSportValue = (e) => {
        this.setState({"Sport": e.target.value});
        console.log("Noticing Sport Change...");
    }

    render = () => {
        return (
            <div className={base_styles.add_team_view}>
                <div className={base_styles.add_team_instructions}>
                    <div className={base_styles.instructions_vball}>
                        <h3 className={base_styles.add_teamh3}>Volleyball Example</h3>
                        <h4 className={base_styles.add_teamh4}>School Name: Calvin College</h4>
                        <h4 className={base_styles.add_teamh4}>URL: http://calvinknights.com/sports/wvball/2017-18/teams/calvin?view=profile&r=0&pos=</h4>
                    </div>
                    <div>
                        <h3 className={base_styles.add_teamh3}>Soccer Example</h3>
                        <h4 className={base_styles.add_teamh4}>School Name: Calvin College</h4>
                        <h4 className={base_styles.add_teamh4}>URL: http://calvinknights.com/sports/msoc/2017-18/teams/calvin?view=profile&r=0&pos=kickers</h4>
                    </div>
                </div>
                <div className={base_styles.add_team_form}>
                    <h2>Add Team to Scouting Report</h2>
                    <select className={base_styles.sportSelector} name="SportSelector" onChange={this.updateSportValue}>
                        <option value="">--</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Volleyball">Volleyball</option>
                    </select><br></br>
                    <h3>Enter Name of School:</h3>
                    <input className={base_styles.inputTeamNameItem} type="text" name="TeamName" onChange={this.updateTeamNameInputValue}/>
                    <h3>Enter Website URL of School:</h3>
                    <input className={base_styles.inputTeamURLItem} type="text" name="TeamURL" onChange={this.updateURLInputValue}/>
                    <br></br>
                    <button className={base_styles.add_team_submit_button} onClick={this.handleSubmit}>Submit</button>
                    <h2 className={base_styles.alertHeader}>{this.state.alertStatus}</h2>
                </div>
            </div>
        )
    }
}

export default AddTeamView;