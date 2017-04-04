import Todo from './Todo';
import React from 'react';

class TodoContainer extends React.Component {
    render() {
        this.state = {
            list : [
                {name: "egy"},
                {name: "kettő"},
                {name: "három"},
                {name: "négy"},
                {name: "öt"},
            ] } ;
        return (
            <div className="todoContainer">
                <TodoList list={this.state.list} />
            </div>
        );
    }
}

const TodoList = ({list}) => (
    <div className="todo">{list.map((todo) => <Todo name={todo.name} />)}</div>
);
export default TodoContainer;