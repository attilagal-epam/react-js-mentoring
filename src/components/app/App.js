import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProgressBar from './../progressbar/ProgressBar';
import TodoContainer from './../todo/TodoContainer';
import EditTodo from './../editTodo/EditTodo';
import {CategoryContainer} from './../category/CategoryContainer';
import { addTodoAction } from '../todo/TodoActions';
import { addCategoryAction } from '../category/CategoryActions';
import { newCategoryTitleChangedAction } from '../category/CategoryActions';
import { todosFilterChangedAction } from '../todo/TodoActions';
import UndoRedoTodos from '../todo/UndoRedoTodos';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            todosFilter: '',
            selectedCategory: null,
            editedTodo: null
        }

        this.createTodo = this.createTodo.bind(this);
    }
  componentDidMount() {
    this.setState({ progress : 10 });
  }

  onTodosFilterChanged(event) {
      this.props.setTodosFilter(Object.assign(this.props.todosFilter, {name: event.target.value}));
  }

  onTodosCheckedFilterChanged(event) {
      console.log(this.refs.todosFilterChecked.value);
      this.props.setTodosFilter(Object.assign(this.props.todosFilter, {done: event.target.value === 'on' ? true : false}));
  }

  moveToCategory(categoryId) {      //  reduxed
    //  TODO:  find todo and set categoryId
    const editedTodo = this.state.editedTodo;
    this.setState({todos: this.state.todos.map(t => editedTodo.key === t.key ? Object.assign(t, {categoryId: categoryId}) : t),
                    editedTodo: null});
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
    let todoComponent = null;
    if (this.props.editedTodo) {
        todoComponent = <EditTodo todo={this.props.editedTodo}
        />;
    } else {
        todoComponent = <TodoContainer todosFilter={this.state.todosFilter}
                                       selectedCategory={this.state.selectedCategory}
        />;
    }
    return (
        <div className="App container">
            <div className="container todoBody">
                <div className="header">
                    <div className="header__title">To-Do List</div>
                    <div className="header__searchArea">
                        <input type="checkbox"
                               name="searchDone"
                               id="searchDone"
                               ref="todosFilterChecked"
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
                        <ProgressBar progress={this.state.progress} />
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
                {todoComponent}
                <UndoRedoTodos />
            </div>
        </div>
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);