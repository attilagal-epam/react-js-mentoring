import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import './Todo.css';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: props.todos,
            todosFilter: props.todosFilter,
            selectedCategory: props.selectedCategory,
            newCategoryTitle: props.newCategoryTitle
        };
    }

    componentWillMount() {
        this.setState({ todos: this.filterTodos()});
    }

    render() {
        console.log(this.props.selectedCategory);
        console.log(this.props.newCategoryTitle);
        return (
            <div className="todoContainer">
                {this.props.todos.present.map((todo) => <Todo
                    todo={todo}
                    key={todo.key}
                    onEditCallback={this.props.onEditCallback}
                    onTodoDoneCallback={this.props.onTodoDoneCallback}
                />)}
            </div>
        );
    }

    categoryFilterPredicate(todo) {
        return !this.state.selectedCategory ? true : todo.categoryId === this.state.selectedCategory;
    }

    todoFilterPredicate(todo) {
        return !this.state.todosFilter ? true : todo.name.indexOf(this.state.todosFilter) !== -1;
    }

    filterTodos() {
        return this.state.todos.present.filter(t => this.todoFilterPredicate(t) && this.categoryFilterPredicate(t));
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.present,
    selectedCategory: state.selectedCategory,
    newCategoryTitle: state.newCategoryTitle
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);