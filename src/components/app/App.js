import React, { Component } from 'react';
import './App.css';
import ProgressBar from './../progressbar/ProgressBar';
import TodoContainer from './../todo/TodoContainer';
import EditTodo from './../editTodo/EditTodo';
import {CategoryContainer} from './../category/CategoryContainer';

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
        ]
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
];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            categories : categoryDataSource,
            todos: todosDataSource,
            todosFilter: '',
            categoryFilter: '',
            newCategory: '',
            newTodo: '',
            editedTodo: null
        }
        console.log(props.params);
    }
  componentDidMount() {
    this.setState({ progress : 10 });
  }

  insertCategory(categoryTitle, parentCategory) {
      const rootCategories = this.state.categories;
      let categories = parentCategory ? parentCategory.categories : this.state.categories;
      categories.unshift({
          key: 10000 - categories.length,
          name: categoryTitle,
          categories: []});
      this.setState({categories: rootCategories});
  }

  addRootCategory() {
        this.insertCategory('vesbdfb');
  }
  addCategory(parentCategory) {
    console.log(this.state.newCategory, parentCategory);
      this.insertCategory('vesbdfb', parentCategory);
  }

  addTodo() {
      console.log(this.state.newTodo);
      let todos = this.state.todos;
      todos.unshift({
          key: 10000 - todos.length,
          name: "haerhd"});
      this.setState({todos: todos});
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

  deleteCategory(categoryId) {
    console.log('DELETE:  ', categoryId);
    this.setState({categories: this.state.categories.filter(t => t.key !== categoryId)});

  }

  moveToCategory(categoryId) {
    //  TODO:  find todo and set categoryId
    const editedTodo = this.state.editedTodo;
    this.setState({todos: this.state.todos.map(t => editedTodo.key === t.key ? Object.assign(t, {categoryId: categoryId}) : t),
                    editedTodo: null});
  }

  onEditTodo(todo) {
      //    TODO: clone the edited todo
      this.setState({editedTodo: todo});
  }

  onTodoSaved(todo) {
      // TODO: find and replace the todo with the same key
      this.setState({editedTodo: null});
  }

  onTodoDone(todo, value) {
      // TODO: find and replace the todo with the same key
      this.setState({todos: this.state.todos.map(t => todo.key === t.key ? Object.assign(t, {done: value}) : t)});
      this.setCategoryProgress(todo.categoryId);
      this.removeFinishedCategories();
      console.log(this.state.todos);
  }

  removeFinishedCategories() {
      this.setState({ categories: this.state.categories.filter(c => this.isCategoryDone(c, this.state.todos)) });
  }

  isCategoryDone(category, todos) {
      if (category.categories.length > 0) {
          
      }
  }

  setCategoryProgress(categoryId) {
    const category = this.state.categories.find(c => c.key === categoryId);
    category.done = !this.state.todos.some(t => t.categoryID === categoryId && !t.done);
  }

  onTodoEditCanceled(todo) {
      this.setState({editedTodo: null});
  }

  render() {
    let todoComponent = null;
    if (this.state.editedTodo) {
        todoComponent = <EditTodo todo={this.state.editedTodo}
                                  onTodoSaved={this.onTodoSaved.bind(this)}
                                  onTodoEditCanceled={this.onTodoEditCanceled.bind(this)}
        />;
    } else {
        todoComponent = <TodoContainer todos={this.state.todos}
                                       onEditCallback={this.onEditTodo.bind(this)}
                                       onTodoDoneCallback={this.onTodoDone.bind(this)}
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
                               value={this.state.newCategory}
                               placeholder="Enter category title" />
                            <button onClick={this.addRootCategory.bind(this)}>Add</button>
                    </div>
                    <div className="addTodo">
                        <input type="text"
                               name="todo"
                               id="todo"
                               value={this.state.newTodo}
                               placeholder="Add todo"/>
                            <button onClick={this.addTodo.bind(this)}>Add</button>
                    </div>
                </div>
                <CategoryContainer
                    categories={this.state.categories}
                    isRoot={true}
                    selectCategoryCallback={this.selectCategory.bind(this)}
                    onDeleteCallback={this.deleteCategory.bind(this)}
                    onAddChildCallback={this.addCategory.bind(this)}
                    onMoveToCategoryCallback={this.moveToCategory.bind(this)}
                    editedTodo={this.state.editedTodo}
                />
                {todoComponent}
            </div>
        </div>
    );
  }
}

export default App;
