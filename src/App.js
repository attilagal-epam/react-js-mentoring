import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProgressBar from './ProgressBar';
import Todo from './Todo';
import TodoContainer from './TodoContainer';
import {CategoryContainer} from './CategoryContainer';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            categories : [
                {
                    name: 'egyes'
                },
                {
                    name: 'kettes'
                },
                {
                    name: 'hármas',
                    categories: [
                        {
                            name: '3.1'
                        },
                        {
                            name: '3.2'
                        },
                        {
                            name: '3.1'
                        }
                    ]
                },
            ]
        }
    }
  componentDidMount(){
    this.setState({ progress : 10 });
  }

  render() {
    return (
        <div className="App container">
            <div className="container todoBody">
                <div className="header">
                    <div className="header__title">To-Do List</div>
                    <div className="header__searchArea">
                        <input type="checkbox" name="searchDone" id="searchDone" />
                        <label htmlFor="searchDone">Show done</label>
                        <input type="text"
                               name="search" className="header__search" id="search"
                               placeholder="Search"/>
                    </div>
                </div>
                <div className="progressBar">
                    <div className="col-sm-12">
                        <ProgressBar progress={this.state.progress} />
                    </div>
                </div>
                <div className="searchBar">
                    <div className="addCategory">
                        <input type="text"
                               name="category"
                               id="category"
                               placeholder="Enter category title" />
                            <button>Add</button>
                    </div>
                    <div className="addTodo">
                        <input type="text"
                               name="todo"
                               id="todo"
                               placeholder="Add todo"/>
                            <button>Add</button>
                    </div>
                </div>
                <CategoryContainer categories={this.state.categories} />
                <TodoContainer />
            </div>
        </div>

    );
  }
}

export default App;
