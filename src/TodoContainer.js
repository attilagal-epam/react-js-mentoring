import Todo from './Todo';
import React from 'react';

class TodoContainer extends React.Component {
    render() {
        this.state = {
            list : [
                {
                    name: "egy",
                    key: "1"
                },
                {
                    name: "kettő",
                    key: "2"
                },
                {
                    name: "három",
                    key: "3"
                },
                {
                    name: "négy",
                    key: "4"
                },
                {
                    name: "öt",
                    key: "5"
                },
            ] } ;
        return (
            <div className="todoContainer">
                {this.state.list.map((todo) => <Todo name={todo.name} key={todo.key} />)}
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
