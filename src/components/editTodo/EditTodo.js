import React from 'react';

class EditTodo extends React.Component {
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
        this.state = {
            todo: this.props.todo
        };

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
                           value={this.state.todo.name}
                           onChange={this.onNameChange.bind(this)}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="todoDone"
                        id="todoDone"
                        value={this.state.todo.done}
                        onChange={this.onDoneChange.bind(this)} />
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

export default EditTodo;