import React from 'react';
import { connect } from 'react-redux';
import { updateTodoAction } from '../todo/TodoActions';
import { finishEditTodoAction } from '../todo/TodoActions';

class EditTodo extends React.Component {
    constructor(props) {
        super(props);
        console.log('ctor', this.props);
        this.todo = {};
    }

    onNameChange(name) {
        console.log('onNameChange', name);
        this.refs.nameInput.value = name;
        this.todo.name = name;
    }

    onDoneChange(checked) {
        this.refs.doneInput.checked = checked;
        this.todo.done = checked;
    }

    onDescriptionChange(description) {
        console.log(description);
        this.refs.descriptionInput.value = description;
        this.todo.description = description;
    }

    onTodoSave() {
        this.props.updateTodo(this.todo);
        this.props.router.push('/some/path');
    }

    onTodoEditCancel() {
        this.props.finishEditTodo();
    }

    render() {
        console.log('EDITFORM  ', this.props.todo);
        this.todo = this.props.todos.present.filter(t => t.key === this.props.match.params.todoKey)[0];
        //this.todo = this.props.todos.present.filter(t => t.key === this.props.id)[0];
        console.log('ETODO', this.todo);
        return (
            <div className="editTodoContainer">
                <div>
                    <button onClick={this.onTodoSave.bind(this)}>Save changes</button>
                    <button onClick={this.onTodoEditCancel.bind(this)}>Cancel</button>
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
                        checked={this.todo.done}
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