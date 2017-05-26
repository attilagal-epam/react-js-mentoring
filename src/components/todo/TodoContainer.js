import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import './Todo.css';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.selectedCategory);
        //console.log(this.props.newCategoryTitle);
        //console.log(this.props.todosFilter);
        return (
            <div className="todoContainer">
                {this.filterTodos().map((todo) => <Todo
                    todo={todo}
                    key={todo.key}
                    done={todo.done}
                />)}
            </div>
        );
    }

    categoryFilterPredicate(todo) {
        return !this.props.selectedCategory ? true : todo.categoryId === this.props.selectedCategory.key;
    }

    todoFilterPredicate(todo) {
        return ( !this.props.todosFilter.done || todo.done === this.props.todosFilter.done) && (!this.props.todosFilter.name ? true :
            todo.name.indexOf(this.props.todosFilter.name) !== -1);
    }

    filterTodos() {
        return this.props.todos.present.filter(t => this.todoFilterPredicate(t) && this.categoryFilterPredicate(t));
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.present,
    selectedCategory: state.selectedCategory,
    newCategoryTitle: state.newCategoryTitle,
    todosFilter: state.todosFilter
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);