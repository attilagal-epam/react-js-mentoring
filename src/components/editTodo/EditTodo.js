import React from 'react';
import { connect } from 'react-redux';
import { updateTodoAction } from '../todo/TodoActions'
import { cancelEditTodoAction } from '../todo/TodoActions'

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
//        this.setState({todo: {name}});
    }

    onDoneChange(event) {
        console.log(event.target.value);
    }

    onDescriptionChange(event) {
        console.log(event.target.value);
    }

    onTodoSave() {
        this.props.updateTodo(this.props.todo);
    }

    onTodoEditCancel() {
        this.props.cancelEditTodo();
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
                           value={this.state.todo.name}
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
                           value={this.state.todo.description}
                           onChange={this.onDescriptionChange.bind(this)}
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
    },
    cancelEditTodo: (t) => {
        dispatch(cancelEditTodoAction(t));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);