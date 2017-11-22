import React from 'react';
import ReactDOM from 'react-dom';
import TabView from './tab_view.js';
import styles from '../css/base.css';

var renderForm = function(button) {
    if (button.target.value == "soccer") {
        console.log("Soccer");
    } else {
        console.log("Volleyball");
    }
}


ReactDOM.render((
    <div id="main">
        <TabView/>
    </div>
), document.getElementById('content'))
