import React from 'react';
import { connect } from 'react-redux';
import { updateTodoAction } from '../todo/TodoActions';
import { finishEditTodoAction } from '../todo/TodoActions';
import { browserHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

class EditTodo extends React.Component {
    constructor(props) {
        super(props);
        console.log('ctor', this.props);
        this.todo = {};
    }

    onNameChange(name) {
        this.todo.name = name;
    }

    onDoneChange(checked) {
        this.todo.done = checked === 'on';
    }

    onDescriptionChange(description) {
        this.todo.description = description;
    }

    onTodoSave() {
        this.props.updateTodo(this.todo);
    }

    onTodoEditCancel() {
        this.props.finishEditTodo();
    }

    render() {
        this.todo = this.props.todos.present.filter(t => t.key === this.props.match.params.todoKey)[0];
        //this.todo = this.props.todos.present.filter(t => t.key === this.props.id)[0];
        return (
            <div className="editTodoContainer">
                <div>
                    <Link to="/" onClick={this.onTodoSave.bind(this)}>Save changes</Link>
                    <Link to="/" onClick={this.onTodoEditCancel.bind(this)}>Cancel</Link>
                </div>
                <div>
                    <input type="text"
                           name="todoName"
                           id="todoName"
                           ref="nameInput"
                           defaultValue={this.todo.name}
                           onChange={event => this.onNameChange(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="todoDone"
                        id="todoDone"
                        defaultChecked={this.todo.done}
                        ref="doneInput"
                        onChange={event => this.onDoneChange(event.target.value)}
                    />
                    <label htmlFor="todoDone">Done</label>
                </div>
                <div>
                    <textarea name="todoDescription"
                           id="todoDescription"
                           defaultValue={this.todo.description}
                           ref="descriptionInput"
                           onChange={event => this.onDescriptionChange(event.target.value)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    return {
        todos: state.todos.present
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateTodo: (t) => {
        dispatch(updateTodoAction(t));
        dispatch(finishEditTodoAction(t));
    },
    finishEditTodo: (t) => {
        dispatch(finishEditTodoAction(t));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);