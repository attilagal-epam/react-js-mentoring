import React from 'react';

class Todo extends React.Component {
    handleEditClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onEditCallback(this.props.todo);
    }

    handleTodoDoneChanged(e) {
        e.preventDefault();
        e.stopPropagation();
        const v = e.target.value;
        console.log(v);
        this.props.onTodoDoneCallback(this.props.todo, v === 'on' ? true : false);
    }

    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox" className="todoFinished"

                           onChange={this.handleTodoDoneChanged.bind(this)}/>
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