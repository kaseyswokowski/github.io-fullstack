import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import App from './components/App';
import { Provider } from './components/Context';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root'));