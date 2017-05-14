import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ProgressBar from './../progressbar/ProgressBar';
import TodoContainer from './../todo/TodoContainer';
import EditTodo from './../editTodo/EditTodo';
import {CategoryContainer} from './../category/CategoryContainer';
import { addTodoAction } from '../todo/TodoActions';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            todosFilter: '',
            selectedCategory: null,
            editedTodo: null
        }

//        this.addTodo = this.addTodo.bind(this);
        this.addRootCategory = this.addRootCategory.bind(this);
    }
  componentDidMount() {
    this.setState({ progress : 10 });
  }

  insertCategory(categoryTitle, parentCategory) {
      const newCategory = {
          name: categoryTitle,
          key: Date.now(),
          categories: [],
          done: false
      };

      const rootCategories = this.state.categories;
      let categories = parentCategory ? parentCategory.categories : this.state.categories;
      categories.unshift(newCategory);
      this.setState({categories: rootCategories});
  }

  addRootCategory(categoryTitle) {
    this.insertCategory(this.selectedCategoryInput.value);
  }

  addCategory(parentCategory) {
      this.insertCategory(this.selectedCategoryInput.value, parentCategory);
  }

  //addTodo(name) {
  //    const newTodo = {
  //        name,
  //        key: Date.now(),
  //        categoryId: this.state.selectedCategory || this.state.categories[0].key,
  //        done: false
  //    };
  //
  //    addTodoAction(newTodo);
  //}
  //
  setTodosFilter(event) {
      this.setState({todosFilter: event.target.value});
  }

  selectCategory(categoryId) {
      this.setState({selectedCategory: categoryId});
  }

  moveToCategory(categoryId) {      //  reduxed
    //  TODO:  find todo and set categoryId
    const editedTodo = this.state.editedTodo;
    this.setState({todos: this.state.todos.map(t => editedTodo.key === t.key ? Object.assign(t, {categoryId: categoryId}) : t),
                    editedTodo: null});
  }

  onEditTodo(todo) {
      console.log('EDIT:  ',todo);
      this.setState({editedTodo: todo});
  }

  onTodoSaved(todo) {
      // TODO: find and replace the todo with the same key
      this.setState({editedTodo: null});
  }

  onTodoDone(todo, value) {
      this.setState({todos: this.state.todos.map(t => todo.key === t.key ? Object.assign(t, {done: value} ) : t)});

      this.setCategoryProgress(todo.categoryId);
      //this.removeFinishedCategories();
      console.log('toggleDone  ', this.state.todos);
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

  onTodoEditCanceled(todo) {
      this.setState({editedTodo: null});
  }

  render() {
    let todoComponent = null;
    if (this.props.editedTodo) {
        todoComponent = <EditTodo todo={this.props.editedTodo}
                                  onTodoSaved={this.onTodoSaved.bind(this)}
                                  onTodoEditCanceled={this.onTodoEditCanceled.bind(this)}
        />;
    } else {
        todoComponent = <TodoContainer onEditCallback={this.onEditTodo.bind(this)}
                                       onTodoDoneCallback={this.onTodoDone.bind(this)}
                                       todosFilter={this.state.todosFilter}
                                       selectedCategory={this.state.selectedCategory}
        />;
    }
    return (
        <div className="App container">
            <div className="container todoBody">
                <div className="header">
                    <div className="header__title">To-Do List</div>
                    <div className="header__searchArea">
                        <input type="checkbox" name="searchDone" id="searchDone" />
                        <label htmlFor="searchDone">Show done</label>
                        <input type="text"
                               name="search"
                               className="header__search"
                               id="search"
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
                               ref={(input) => { this.selectedCategoryInput = input; } }
                               placeholder="Enter category title" />
                            <button onClick={() => { this.selectedCategoryInput && this.addRootCategory(this.selectedCategoryInput.value)} }>Add</button>
                    </div>
                    <div className="addTodo">
                        <input type="text"
                               name="todo"
                               id="todo"
                               ref={(input) => { this.todoFilterInput = input; } }
                               placeholder="Add todo"/>
                            <button onClick={() => { this.todoFilterInput && this.addTodo(this.todoFilterInput.value)} }>Add</button>
                    </div>
                </div>
                <CategoryContainer
                    isRoot={true}
                    selectCategoryCallback={this.selectCategory.bind(this)}
                    onAddChildCallback={this.addCategory.bind(this)}
                    onMoveToCategoryCallback={this.moveToCategory.bind(this)}
                    editedTodo={this.props.editedTodo}
                />
                {todoComponent}
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    editedTodo: state.editedTodo
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (name) => {
        const newTodo = {
            name,
            key: Date.now(),
            categoryId: this.state.selectedCategory || this.state.categories[0].key,
            done: false
        };

        dispatch(addTodoAction(newTodo));
    }


    //deleteCategory: (c) => {
    //    dispatch(deleteCategory(c));
    //},
    //addCategory: (c, title) => {
    //    dispatch(addCategory(c, title));
    //},
    //moveToCategory: (c, targetCategory) => {
    //    dispatch(moveToCategory(c, targetCategory));
    //}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);