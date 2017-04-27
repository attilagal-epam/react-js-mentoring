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
];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            categories : categoryDataSource,
            todos: todosDataSource,
            todosFilter: '',
            selectedCategory: null,
            editedTodo: null
        }

        this.addTodo = this.addTodo.bind(this);
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

  addTodo(name) {
      const newTodo = {
          name,
          key: Date.now(),
          categoryId: this.state.selectedCategory || categoryDataSource[0].key,
          done: false
      };

      this.setState({
          todos: [...this.state.todos, newTodo]
      });
  }

  setTodosFilter(event) {
      this.setState({todosFilter: event.target.value});
  }

  todoFilterPredicate(todo) {
      return !this.state.todosFilter ? true : todo.name.indexOf(this.state.todosFilter) !== -1;
  }

  categoryFilterPredicate(todo) {
      return !this.state.selectedCategory ? true : todo.categoryId === this.state.selectedCategory;
  }

  filterTodos() {
      //const todosNew = this.state.todos.filter(t => t.name.indexOf(this.state.todosFilter) !== -1 && t.key === this.state.selectedCategory);
      //const todosNew = this.state.todos.map(t => { t.name.indexOf(this.state.todosFilter) !== -1 && t.key === this.state.selectedCategory});
      //this.setState({todos: todosNew});
      //console.log(this.state);
      return this.state.todos.filter(t => this.todoFilterPredicate(t) && this.categoryFilterPredicate(t));
  }

  selectCategory(categoryId) {
      this.setState({selectedCategory: categoryId});
  }

  deleteCategory(categoryId) {
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
      console.log('ADD  ', this.state.todos);
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
    category.done = !this.state.todos.some(t => t.categoryId === categoryId && !t.done);
  }

  onTodoEditCanceled(todo) {
      this.setState({editedTodo: null});
  }

  render() {
    let todoComponent = null;
      console.log(this.state.selectedCategory, this.state.todosFilter, this.state.todos);
    if (this.state.editedTodo) {
        todoComponent = <EditTodo todo={this.state.editedTodo}
                                  onTodoSaved={this.onTodoSaved.bind(this)}
                                  onTodoEditCanceled={this.onTodoEditCanceled.bind(this)}
        />;
    } else {
        todoComponent = <TodoContainer todos={this.filterTodos()}
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
