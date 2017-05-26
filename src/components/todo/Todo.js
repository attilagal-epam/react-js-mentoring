import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editTodoAction } from './TodoActions'
import { updateTodoAction } from './TodoActions'
import { finishTodoAction } from './TodoActions'
import { setCategoryDoneAction } from '../category/CategoryActions';

class Todo extends React.Component {
    handleEditClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.editTodo(this.props.todo);
    }

    handleTodoDoneChanged(e) {
        const v = e.target.value;
        console.log(v);
        this.props.changeTodoFinished(this.props.todo, v === 'on', this.getCategoryCompleted(this.props.todo.categoryId));
    }

    getCategoryCompleted(categoryId) {
        const todosByCategoryId = this.props.todos.present.filter(t => t.categoryId === categoryId);
        return todosByCategoryId.every(t => t.done);
    }

    render() {
        return (
            <div className="todo">
                <div className="todoContent">
                    <input type="checkbox"
                           className="todoFinished"
                           ref={(input) => { this.finished = input; } }
                           value={this.props.todo.done}
                           onChange={this.handleTodoDoneChanged.bind(this)}/>
                    <span className="todoTitle">{this.props.todo.name} Kat: {this.props.todo.categoryId}</span>
                    <div className="todoButtons">
                        <Link to={`/todo/${this.props.todo.key}`}>
                            <i className="fa fa-pencil-square-o toolButton"
                               />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
//  onClick={this.handleEditClick.bind(this)}
const mapStateToProps = (state) => ({
    categories: state.categories,
    todos: state.todos.present
});

const mapDispatchToProps = (dispatch) => ({
    editTodo: (t) => {
        dispatch(editTodoAction(t));
    },
    changeTodoFinished: (t, done) => {
        dispatch(finishTodoAction(t, done));
        dispatch(setCategoryDoneAction(t.categoryId, done));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);