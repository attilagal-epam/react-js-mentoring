import React from 'react';
import { connect } from 'react-redux';
import {CategoryList} from './CategoryContainer';
import { deleteCategoryAction } from './CategoryActions'
import { addCategoryAction } from './CategoryActions'
import { selectCategoryAction } from './CategoryActions'
import { unselectCategoryAction } from './CategoryActions'
import { moveToCategoryAction } from '../todo/TodoActions';
import { finishEditTodoAction } from '../todo/TodoActions'

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.selected = false;
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.selectCategory(this.props.category, !this.selected);
    }

    handleDeleteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.deleteCategory(this.props.category);
    }

    handleAddChildClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.addCategory(this.props.newCategoryTitle, this.props.category);
    }

    handleMoveToCategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.moveToCategory(this.props.category.key, this.props.editedTodo);
    }

    render() {
        this.selected = this.props.selectedCategory && this.props.selectedCategory.key === this.props.category.key;
        let buttons;
        if (this.props.editedTodo) {
            buttons = <div className="categoryButtons"><i className="fa fa-arrow-left toolButton"
                              onClick={this.handleMoveToCategoryClick.bind(this)}></i></div>;
        } else {
            buttons = <div className="categoryButtons">
                <i className="fa fa-pencil-square-o categoryEdit"></i>
                <i className="fa fa-trash-o toolButton"
                   onClick={this.handleDeleteClick.bind(this)}></i>
                <i className="fa fa-plus toolButton"
                   onClick={this.handleAddChildClick.bind(this)}></i>
            </div>;
        }
        return (
            <div className="category"
                 onClick={this.handleClick.bind(this)}>
                <span className="categoryTitle">
                    {this.props.category.name}  {this.props.category.done ? 'D' : ''}{this.selected ? 'S' : ''}
                </span>
                {buttons}
                {this.props.category.categories &&
                <div className="categories">
                    <CategoryList list={this.props.category.categories}
                                  editedTodo={this.props.editedTodo}
                    />
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    newCategoryTitle: state.newCategoryTitle,
    editedTodo: state.editedTodo,
    selectedCategory: state.selectedCategory
});

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (c) => {
        dispatch(deleteCategoryAction(c));
    },
    addCategory: (c, title) => {
        dispatch(addCategoryAction(c, title));
    },
    moveToCategory: (c, editedTodo) => {
        dispatch(moveToCategoryAction(c, editedTodo));
        dispatch(finishEditTodoAction());
    },
    selectCategory: (c, selected) => {
        if (selected) {
            dispatch(selectCategoryAction(c));
        }
        else {
            dispatch(unselectCategoryAction(c));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);