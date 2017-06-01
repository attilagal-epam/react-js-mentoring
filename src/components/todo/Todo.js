import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editTodoAction } from './TodoActions'
import { finishTodoAction } from './TodoActions'
import { setCategoryDoneAction } from '../category/CategoryActions';
import { calculateProgressAction} from '../category/CategoryActions';

export class Todo extends React.Component {
    handleEditClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.editTodo(this.props.todo);
    }

    handleTodoDoneChanged(e) {
        this.props.todo.done = this.finishedCheckbox.checked;
        this.props.changeTodoFinished(this.props.todo, this.finishedCheckbox.checked, this.getCategoryCompleted(this.props.todo.categoryId), this.props.categories, this.props.todos);
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
                           ref={(input) => { this.finishedCheckbox = input; } }
                           checked={this.props.todo.done}
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
    changeTodoFinished: (t, done, categoryDone, categories, todos) => {
        dispatch(finishTodoAction(t, done));
        dispatch(setCategoryDoneAction(t.categoryId, categoryDone));
        dispatch(calculateProgressAction(categories, todos));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);