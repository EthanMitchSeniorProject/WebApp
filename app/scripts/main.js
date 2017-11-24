import React from 'react';
import ReactDOM from 'react-dom';
import TabView from './tab_view.js';
import SoccerView from './soccer/soccer_view.js';
import VballView from './vball/vball_view.js';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {"sport" : ""};
        this.setState = this.setState.bind(this);
    }

    renderSoccer = () => {
        return (
            <div className="soccer_view">
                <TabView setState={this.setState}/>
                <SoccerView/>
            </div>
        )
    }

    renderVball = () => {
        return (
            <div className="vball_view">
                <TabView setState={this.setState}/>
                <VballView/>
            </div>
        )
    }

    renderNoSport = () => {
        return (
            <TabView setState={this.setState}/>
        )
    }
    
    render = () => {
        if (this.state.sport == "soccer") {
            return this.renderSoccer();
        } else if (this.state.sport == "vball") {
            return this.renderVball();
        } else {
            return this.renderNoSport();
        }
    }
}

export default Main;