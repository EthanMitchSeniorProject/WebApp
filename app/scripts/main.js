import React from 'react';
import ReactDOM from 'react-dom';
import TabView from './tab_view.js';
import SoccerView from './soccer/soccer_view.js';
import VballView from './vball/vball_view.js';
import styles from '../css/base.css'

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
            <div className="no_sport_view">
                <TabView setState={this.setState}/>
                <div className={styles.welcomeHeader}>
                    <h1>Welcome to the Calvin Scouting Report Application</h1>
                    <h2>Creators: Mitch Stark and Ethan Clark</h2>
                    <h3>Any issues contact elc3@students.calvin.edu</h3>
                </div>
            </div>
        )
    }
    
    render = () => {
        if (this.state.sport == "Soccer") {
            return this.renderSoccer();
        } else if (this.state.sport == "Volleyball") {
            return this.renderVball();
        } else {
            return this.renderNoSport();
        }
    }
}

export default Main;