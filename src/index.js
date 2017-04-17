import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app/App';
import './index.css';
import './lib/font-awesome/css/font-awesome.min.css'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="(/:filter)(/:category)" component={App} />
        </Route>
        <App />
    </Router>)
        ,
  document.getElementById('root')
);