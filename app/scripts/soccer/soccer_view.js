import React from 'react';
import ReactDOM from 'react-dom';
import TeamSelector from './team_selector.js';
import StarterView from './starter_view.js';

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
                <StarterView team={this.state.team}/>
            </div>
        )
    }
}

export default SoccerView;