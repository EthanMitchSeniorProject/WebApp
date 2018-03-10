import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import $ from 'jquery';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class TrendModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: true,
            trend_jsx: null,
            num_games: 1
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    updateNumGames(e) {
        this.setState({num_games: e.target.value});
    }

    getTrendInformation = () => {
        if (this.state.trend_jsx != null) {
            return;
        }

        $.getJSON('/soccer/players/' + this.props.player_id + '/trend/' + this.state.num_games, (trend_response) => {
            this.setState({trend_jsx: (
                <div className="trendTable">
                    <h1>Trend for last {this.state.num_games}</h1>
                    <table className="playerTrend">
                        <tr>
                            <th>Goals</th>
                            <th>Assists</th>
                            <th>Starts</th>
                        </tr>
                        <tr>
                            <td>{trend_response['goals']}</td>
                            <td>{trend_response['assists']}</td>
                            <td>{trend_response['starts']}</td>
                        </tr>
                    </table>
                </div>
            )})
        });
    }

    render() {
        this.getTrendInformation();
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal}>close</button>
                    <p>Number of Games:</p><input type="number" min="0" onClick={this.updateNumGames} />
                    {this.state.trend_jsx}
                </Modal>
            </div>
        );
    }
}

export default TrendModal;