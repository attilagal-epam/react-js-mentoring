import React from 'react';

class Todo extends React.Component {
    handleEditClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onEditCallback(this.props.todo);
    }

    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox" className="todoFinished" />
                    <span className="todoTitle">{this.props.todo.name}</span>
                    <div className="todoButtons">
                        <i className="fa fa-pencil-square-o toolButton"
                           onClick={this.handleEditClick.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;