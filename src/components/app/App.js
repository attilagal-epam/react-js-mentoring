import React, { Component } from 'react';
import './App.css';
import ProgressBar from './../progressbar/ProgressBar';
import TodoContainer from './../todo/TodoContainer';
import {CategoryContainer} from './../category/CategoryContainer';

const categoryDataSource = [
    {
        name: 'egyes',
        key: '1'
    },
    {
        name: 'kettes',
        key: '2'
    },
    {
        name: 'hármas',
        key: '3',
        categories: [
            {
                name: '3.1',
                key: '3.1'
            },
            {
                name: '3.2',
                key: '3.2',
                categories: [
                    {
                        name: '3.2.1',
                        key: '3.2.1'
                    }
                ]
            },
            {
                name: '3.3',
                key: '3.3'
            }
        ]
    }
],
    todosDataSource = [
    {
        name: 'egy',
        key: '1',
        categoryId: '3.3'
    },
    {
        name: 'kettő',
        key: '2',
        categoryId: '3.3'
    },
    {
        name: 'három',
        key: '3',
        categoryId: '1'
    },
    {
        name: 'négy',
        key: '4',
        categoryId: '3'
    },
    {
        name: 'öt',
        key: '5',
        categoryId: '2'
    }
];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            categories : categoryDataSource,
            todos: todosDataSource,
            todosFilter: ''
        }
        console.log(props.params);
    }
  componentDidMount(){
    this.setState({ progress : 10 });
  }

  setTodosFilter(event) {
      this.setState({todosFilter: event.target.value});
//      console.log(this.state);
      this.doFilter();
  }

  doFilter() {
      const todosNew = todosDataSource.filter(t => t.name.indexOf(this.state.todosFilter) !== -1 && t.key === this.state.categoryFilter);
      this.setState({todos: todosNew});
      console.log(this.state);
  }

  selectCategory(categoryId) {
      this.setState({categoryFilter: categoryId});
      this.doFilter();
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
                               placeholder="Search"
                               onChange={this.setTodosFilter.bind(this)}/>
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
                <CategoryContainer
                    categories={this.state.categories}
                    isRoot={true}
                    selectCategoryCallback={this.selectCategory.bind(this)}
                />
                <TodoContainer todos={this.state.todos} />
            </div>
        </div>
    );
  }
}

export default App;
