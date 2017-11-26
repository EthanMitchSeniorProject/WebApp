import React from 'react';
import ReactDOM from 'react-dom';
import TeamSelector from './team_selector.js';

class SoccerView extends React.Component {
    render = () => {
        return (
            <div className="soccer_view">
                <TeamSelector/>
            </div>
        )
    }
}

export default SoccerView;