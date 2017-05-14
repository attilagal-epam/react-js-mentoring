import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import './Todo.css';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: props.todos,
            todosFilter: props.todosFilter,
            selectedCategory: props.selectedCategory
            //filteredTodos: todoListItems,
            //categoryId: +props.match.params.categoryId
        };
    }

    componentWillMount() {
        this.setState({ todos: this.filterTodos()});
    }

    render() {
        return (
            <div className="todoContainer">
                {this.state.todos.map((todo) => <Todo
                    todo={todo}
                    key={todo.key}
                    onEditCallback={this.props.onEditCallback}
                    onTodoDoneCallback={this.props.onTodoDoneCallback}
                />)}
            </div>
        );
    }

    categoryFilterPredicate(todo) {
        return !this.state.selectedCategory ? true : todo.categoryId === this.state.selectedCategory;
    }

    todoFilterPredicate(todo) {
        return !this.state.todosFilter ? true : todo.name.indexOf(this.state.todosFilter) !== -1;
    }

    filterTodos() {
        return this.state.todos.filter(t => this.todoFilterPredicate(t) && this.categoryFilterPredicate(t));
    }
}

const TodoList = ({list}) => (
    <div className="todo">{list.map((todo) => <Todo name={todo.name} key={todo.key} />)}</div>
);

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    selectTodo: (todo) => {
        //dispatch(selectTodo(todo));
        console.log('TODO ');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
/*

 {this.state.map((todo) => <Todo
 todo={todo}
 key={todo.key}
 onEditCallback={this.props.onEditCallback}
 onTodoDoneCallback={this.props.onTodoDoneCallback}
 />)}


<TodoList list={this.state.list} />

 //        const todos = props.todos.filter(todo => {
 //if (props.showAll && +props.match.params.categoryId === todo.categoryID) {
 //    return todo.name.includes(props.searchTerm);
 //} else {
 //    return (!todo.done && todo.name.includes(props.searchTerm) && +props.match.params.categoryId === todo.categoryID)
 //}
 //        });

 //const todoListItems = todos.map((todo) => {
 //    const checked = (todo.done) ? 'checked' : null;
 //    return <TodoListItem key={todo.id} todoitem={todo} checked={checked} path={props.match.url}/>
 //});
 //

*/
