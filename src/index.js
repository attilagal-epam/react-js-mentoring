import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import App from './components/app/App';
import EditTodo from './components/editTodo/EditTodo';
import './index.css';
import './lib/font-awesome/css/font-awesome.min.css'
import todoAppReducer from './reducers/reducerApp';

let store = createStore(todoAppReducer);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>)
        ,
  document.getElementById('root')
);



//<Router>
//    <Route path="/" component={App} >
//        <Route path="/todo/:todoKey" component={EditTodo} />
//    </Route>
//</Router>
