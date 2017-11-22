import React from 'react';
import ReactDOM from 'react-dom';

class TabView extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSoccerClick = (event) => {
        event.preventDefault();
        console.log("soccer");
    }

    handleVballClick = (event) => {
        event.preventDefault();
        console.log("vball");
        //Do something here like this.props.setState({sport: volleyball}) where this.setState
    }

    render = () => {
        return (
            <div className="tab_view">
                <form className="sportForm">
                    <input type="submit" value="soccer" onClick={this.handleSoccerClick}/>
                    <input type="submit" value="vball" onClick={this.handleVballClick}/>
                </form>
            </div>
        )
    }
}

export default TabView;