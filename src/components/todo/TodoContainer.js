import React from 'react';
import Todo from './Todo';
import './Todo.css';

class TodoContainer extends React.Component {
    render() {
        this.state = this.props.todos;
        return (
            <div className="todoContainer">
                {this.state.map((todo) => <Todo name={todo.name} key={todo.key} />)}
            </div>
        );
    }
}

export default TodoContainer;

/*
<TodoList list={this.state.list} />

const TodoList = ({list}) => (
    <div className="todo">{list.map((todo) => <Todo name={todo.name} key={todo.key} />)}</div>
);
*/
