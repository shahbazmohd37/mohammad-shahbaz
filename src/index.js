import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Users from './Components/PearsonUser/PearsonUsers';
// import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Users />, document.getElementById('root'));
registerServiceWorker();
