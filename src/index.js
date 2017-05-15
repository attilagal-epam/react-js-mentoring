import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import App from './components/app/App';
import './index.css';
import './lib/font-awesome/css/font-awesome.min.css'
import todoAppReducer from './reducers/reducerApp';
/*
const categoryDataSource = [
        {
            name: 'egyes',
            key: '1',
            categories: [],
            done: false
        },
        {
            name: 'kettes',
            key: '2',
            categories: [],
            done: false
        },
        {
            name: 'hármas',
            key: '3',
            categories: [
                {
                    name: '3.1',
                    key: '3.1',
                    categories: [],
                    done: false
                },
                {
                    name: '3.2',
                    key: '3.2',
                    categories: [
                        {
                            name: '3.2.1',
                            key: '3.2.1',
                            categories: [],
                            done: false
                        }
                    ]
                },
                {
                    name: '3.3',
                    key: '3.3',
                    categories: [],
                    done: false
                }
            ],
            done: false
        }
    ]/*,
initialState = {
    categories: categoryDataSource,
    todos: todosDataSource
}*/;

//let store = createStore(todoAppReducer, initialState);
let store = createStore(todoAppReducer);

ReactDOM.render((
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="(/:filter)(/:category)" component={App} />
        </Route>
        <App />
    </Router>
    </Provider>)
        ,
  document.getElementById('root')
);