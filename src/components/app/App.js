import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import ProgressBar from './../progressbar/ProgressBar';
import TodoContainer from './../todo/TodoContainer';
import EditTodo from './../editTodo/EditTodo';
import {CategoryContainer} from './../category/CategoryContainer';
import { addTodoAction } from '../todo/TodoActions';
import { addCategoryAction } from '../category/CategoryActions';
import { calculateProgressAction } from '../category/CategoryActions';
import { newCategoryTitleChangedAction } from '../category/CategoryActions';
import { todosFilterChangedAction } from '../todo/TodoActions';
import UndoRedoTodos from '../todo/UndoRedoTodos';


class App extends Component {
    constructor(props){
        super(props);
        this.createTodo = this.createTodo.bind(this);
    }
  componentDidMount() {
      this.props.calculateProgress(this.props.categories, this.props.todos);
  }

  onTodosFilterChanged(event) {
      this.props.setTodosFilter(Object.assign(this.props.todosFilter, {name: event.target.value}));
  }

  onTodosCheckedFilterChanged(event) {
//      console.log(this.refs.todosFilterChecked.value);
      this.props.setTodosFilter(Object.assign(this.props.todosFilter, {done: this.todosFilterChecked.checked }));
  }

  onTodoDone(todo, value) {
      this.setState({todos: this.state.todos.map(t => todo.key === t.key ? Object.assign(t, {done: value} ) : t)});

      this.setCategoryProgress(todo.categoryId);
      //this.removeFinishedCategories();
      console.log('toggleDone  ', this.state.todos);
  }

  onNewCategoryTitleChanged(newTitle) {
      this.props.newCategoryTitleChanged(newTitle);
  }

  removeFinishedCategories() {
      this.setState({ categories: this.state.categories.filter(c => this.isCategoryDone(c, this.state.todos)) });
  }

  isCategoryDone(category) {
      const todosByCategory = this.state.todos.filter(t => t.categoryId === category.key);
      return todosByCategory.every(t => t.done);
  }

  isCategoryDisplayable(category) {
      return this.isCategoryDone(category)
              && (category.categories.length > 0 && category.categories.every(c => this.isCategoryDone(c)));
  }

  findCategory(rootCategories, categoryId) {
      for (let i=0; i<rootCategories.length; i++) {
          if (rootCategories[i].key === categoryId) {
              return rootCategories[i];
          }
          else if (rootCategories[i].categories.length > 0) {
              const retVal = this.findCategory(rootCategories[i].categories, categoryId);
              if (retVal) {
                  return retVal;
              }
          }
      }
  }

  setCategoryProgress(categoryId) {
    const category = this.findCategory(this.state.categories, categoryId);
    category.done = !this.state.todos.some(t => t.categoryId === categoryId && !t.done);
  }

  createTodo(name) {
      return {
          name,
          key: Date.now(),
          categoryId: this.props.selectedCategory || this.props.categories[0].key,
          done: false
      };
  }

  render() {
    //let todoComponent = null;
    //  console.log('MATCH', this.props.match);
    //if (this.props.match.params.todoKey) {
    //    todoComponent = <EditTodo id={this.props.match.params.todoKey} />;
    //} else {
    //    todoComponent = <TodoContainer />;
    //}
    return (
        <Router>
        <div className="App container">
            <div className="container todoBody">
                <div className="header">
                    <div className="header__title">To-Do List</div>
                    <div className="header__searchArea">
                        <input type="checkbox"
                               name="searchDone"
                               id="searchDone"
                               ref={(input) => { this.todosFilterChecked = input; } }
                               onChange={this.onTodosCheckedFilterChanged.bind(this)}/>
                        <label htmlFor="searchDone">Show done</label>
                        <input type="text"
                               name="search"
                               className="header__search"
                               id="search"
                               placeholder="Search"
                               onChange={this.onTodosFilterChanged.bind(this)}/>
                    </div>
                </div>
                <div className="progressBar">
                    <div className="col-sm-12">
                        <ProgressBar />
                    </div>
                </div>
                <div className="searchBar">
                    <div className="addCategory">
                        <input type="text"
                               name="category"
                               id="category"
                               ref={(input) => { this.selectedCategoryInput = input; } }
                               placeholder="Enter category title"
                               onChange={event => this.onNewCategoryTitleChanged(event.target.value)}
                        />
                        <button onClick={() => { this.props.addCategory(this.selectedCategoryInput.value)} }>Add</button>
                    </div>
                    <div className="addTodo">
                        <input type="text"
                               name="todo"
                               id="todo"
                               ref={(input) => { this.newTodoInput = input; } }
                               placeholder="Add todo"/>
                        <button onClick={() => { this.newTodoInput && this.props.addTodo(this.createTodo(this.newTodoInput.value))} }>Add</button>
                    </div>
                </div>
                <CategoryContainer
                    isRoot={true}
                    editedTodo={this.props.editedTodo}
                />
                <Switch>
                    <Route path="/todo/:todoKey" component={EditTodo} />
                    <Route path="/" component={TodoContainer} />
                </Switch>
                <UndoRedoTodos />
            </div>
        </div>
        </Router>
    );
  }
}


const mapStateToProps = (state) => ({
    editedTodo: state.editedTodo,
    selectedCategory: state.selectedCategory,
    categories: state.categories,
    todos: state.todos.present,
    todosFilter: state.todosFilter
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (newTodo) => {
        dispatch(addTodoAction(newTodo));
    },
    addCategory: (newCategory) => {
        dispatch(addCategoryAction(newCategory, null));
    },
    newCategoryTitleChanged: (categoryTitle) => {
        dispatch(newCategoryTitleChangedAction(categoryTitle));
    },
    setTodosFilter: (todosFilter) => {
        dispatch(todosFilterChangedAction(todosFilter));
    },
    calculateProgress: (categories, todos) => {
        dispatch(calculateProgressAction(categories, todos));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);