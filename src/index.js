import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import App from './components/app/App';
import './index.css';
import './lib/font-awesome/css/font-awesome.min.css'
import todoAppReducer from './reducers/reducerApp';

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
    ],
    todosDataSource = [
        {
            name: 'egy',
            key: '1',
            categoryId: '3.3',
            description: 'agsdgxdhbxfgncfncvhm',
            done: false
        },
        {
            name: 'kettő',
            key: '2',
            categoryId: '3.3',
            description: '',
            done: false
        },
        {
            name: 'három',
            key: '3',
            categoryId: '1',
            description: '',
            done: false
        },
        {
            name: 'négy',
            key: '4',
            categoryId: '3',
            description: '',
            done: false
        },
        {
            name: 'öt',
            key: '5',
            categoryId: '2',
            description: '',
            done: false
        }
    ],
initialState = {
    categories: categoryDataSource,
    todos: todosDataSource
};

let store = createStore(todoAppReducer, initialState);

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