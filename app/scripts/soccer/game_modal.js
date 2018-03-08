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

class GameModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: true,
            game_info: null
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

    getGameLog() {
        if (this.state.game_info != null) {
            return;
        }

        $.getJSON('soccer/game/' + this.props.game_id, (event_array) => {
            console.log("Got Response: " + JSON.stringify(event_array));
            let selected_team_score = 0;
            let opponent_score = 0;

            this.setState({game_info: (
                <div className="modalGameInfo">
                    <table className="events">
                        <tbody>
                            <tr>
                                <th>Score</th>
                                <th>Event Description</th>
                            </tr>
                            {
                                event_array.map( (event_json) => {

                                    console.log(event_json.team_id + " - " + this.props.selected_team_id);
                                    if (event_json.team_id == this.props.selected_team_id) {
                                        selected_team_score++;
                                    } else {
                                        opponent_score++;
                                    }

                                    return (
                                        <tr>
                                            <td>{selected_team_score}-{opponent_score}</td>
                                            <td>{event_json.description_event}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )});
        })
    }

    render() {
        this.getGameLog();
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
                    {this.state.game_info}
                </Modal>
            </div>
        );
    }
}

export default GameModal;