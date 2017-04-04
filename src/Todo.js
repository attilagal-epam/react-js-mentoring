import React from 'react';

class Todo extends React.Component {
    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox" className="todoFinished" />
                    <span className="todoTitle">{this.props.name}</span>
                    <div className="todoButtons">
                        <i className="fa fa-pencil-square-o toolButton"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;