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
        this.props.setState({"sport": "Volleyball"})
    }

    render = () => {
        return (
            <div className="tab_view">
                <form className="sportForm">
                    <input className={styles.tab_button} type="submit" value="Soccer" onClick={this.handleSoccerClick}/>
                    <input className={styles.tab_button} type="submit" value="Volleyball" onClick={this.handleVballClick}/>
                </form>
            </div>
        )
    }
}

export default TabView;