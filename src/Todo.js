import React from 'react';

class Todo extends React.Component {
    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox" className="todoFinished" />
                    <span className="todoTitle">{this.props.name}</span>
                    <button className="editTodo"><i class="fa-edit"></i>s</button>
                </div>
            </div>
        );
    }
}

export default Todo;