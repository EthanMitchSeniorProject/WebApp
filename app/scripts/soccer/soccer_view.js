import React from 'react';
import ReactDOM from 'react-dom';
import TeamSelector from './team_selector.js';

class SoccerView extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {team: ""};
    }

    setSoccerViewState = (event) => {
        //event.target.value - the team name (passed by the value of the button clicked)
        this.setState({team: event.target.value});
    }

    render = () => {
        return (
            <div className="soccer_view">
                <TeamSelector setTeam={this.setSoccerViewState}/>
            </div>
        )
    }
}

export default SoccerView;