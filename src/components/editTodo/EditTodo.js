import React from 'react';
import { connect } from 'react-redux';
import { updateTodoAction } from '../todo/TodoActions'

class EditTodo extends React.Component {
    constructor() {
        super();
        //this.state = {
        //    todo: this.props.todo
        //};
    }

    onNameChange(event) {
        console.log(event.target.value);
    }

    onDoneChange(event) {
        console.log(event.target.value);
    }

    onDescriptionChange(event) {
        console.log(event.target.value);
    }

    render() {
        console.log('EDITFORM  ', this.props.todo);

        return (
            <div className="editTodoContainer">
                <div>
                    <button onClick={this.props.onTodoSaved}>Save changes</button>
                    <button onClick={this.props.onTodoEditCanceled}>Cancel</button>
                </div>
                <div>
                    <input type="text"
                           name="todoName"
                           id="todoName"
                           value={this.props.editTodo.name}
                           onChange={this.onNameChange.bind(this)}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="todoDone"
                        id="todoDone"
                        value={this.props.todo.done}
                        onChange={this.onDoneChange.bind(this)} />
                    <label htmlFor="todoDone">Done</label>
                </div>
                <div>
                    <textarea name="todoDescription"
                           id="todoDescription"
                           value={this.props.todo.description}
                           onChange={this.onDescriptionChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todo: state
});

const mapDispatchToProps = (dispatch) => ({
    updateTodo: (t) => {
        dispatch(updateTodoAction(t));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);