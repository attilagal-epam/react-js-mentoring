import React from 'react';
import { connect } from 'react-redux';
import { editTodoAction } from './TodoActions'
import { updateTodoAction } from './TodoActions'
import { changeTodoFinishedAction } from './TodoActions'

class Todo extends React.Component {
    handleEditClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.editTodo(this.props.todo);
    }

    handleTodoDoneChanged(e) {
        const v = e.target.value;
        console.log(v);
        this.props.changeTodoFinished(this.props.todo, v === 'on' ? true : false);
    }

    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox"
                           className="todoFinished"
                           ref={(input) => { this.finished = input; } }
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

const mapStateToProps = (state) => ({
//    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    editTodo: (t) => {
        dispatch(editTodoAction(t));
    },
    changeTodoFinished: (t) => {
        dispatch(changeTodoFinishedAction(t));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);