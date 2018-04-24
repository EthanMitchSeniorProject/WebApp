import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/base.css'

class TabView extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSoccerClick = (event) => {
        event.preventDefault();
        this.props.setState({"sport": "Soccer"});
    }

    handleVballClick = (event) => {
        event.preventDefault();
        this.props.setState({"sport": "Volleyball"});
    }

    handleAddTeamClick = (event) => {
        event.preventDefault();
        this.props.setState({"sport": "Add Team"});
    }

    handleHomeClick = (event) => {
        event.preventDefault();
        this.props.setState({"sport": "Home"});
    }

    render = () => {
        return (
            <div className="tab_view">
                <form className="sportForm">
                    <input className={styles.home_tab_button} type="submit" value="Home" onClick={this.handleHomeClick}/>
                    <input className={styles.tab_button} type="submit" value="Soccer" onClick={this.handleSoccerClick}/>
                    <input className={styles.tab_button} type="submit" value="Volleyball" onClick={this.handleVballClick}/>
                    <input className={styles.add_team_button} type="submit" value="Add Team" onClick={this.handleAddTeamClick}/>
                </form>
            </div>
        )
    }
}

export default TabView;