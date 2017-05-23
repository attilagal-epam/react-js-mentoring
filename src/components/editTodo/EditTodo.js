import React from 'react';
import { connect } from 'react-redux';
import { updateTodoAction } from '../todo/TodoActions'
import { finishEditTodoAction } from '../todo/TodoActions'

class EditTodo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            todo : {...props.todo}
        };
    }

    componentWillMount() {

    }

    onNameChange(name) {
        console.log('onNameChange', name);
        this.refs.nameInput.value = name;
//        this.setState({todo: {name}});
    }

    onDoneChange(event) {
        console.log(event.target.value);
    }

    onDescriptionChange(description) {
        console.log(description);
        this.refs.descriptionInput.value = description;
    }

    onTodoSave() {
        this.props.updateTodo(this.props.todo);
    }

    onTodoEditCancel() {
        this.props.finishEditTodo();
    }

    render() {
        console.log('EDITFORM  ', this.props.todo);

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
                           value={this.props.todo.name}
                           ref="nameInput"
                           onChange={event => this.onNameChange(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="todoDone"
                        id="todoDone"
                        value={this.props.todo.done}
                    />
                    <label htmlFor="todoDone">Done</label>
                </div>
                <div>
                    <textarea name="todoDescription"
                           id="todoDescription"
                           value={this.props.todo.description}
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
        todo: state.editedTodo
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