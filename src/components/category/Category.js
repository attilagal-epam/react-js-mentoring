import React from 'react';
import { connect } from 'react-redux';
import {CategoryList} from './CategoryContainer';
import { deleteCategoryAction } from './CategoryActions'
import { addCategoryAction } from './CategoryActions'
import { selectCategoryAction } from './CategoryActions'
import { moveToCategoryAction } from '../todo/TodoActions';

class Category extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.selectCategory(this.props.category);
//        this.props.selectCategoryCallback(this.props.category.key);
    }

    handleDeleteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.deleteCategory(this.props.category);
    }

    handleAddChildClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.addCategory(this.props.category, 'CATEGORY_TITLE');
//        this.props.onAddChildCallback(this.props.category);
    }

    handleMoveToCategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.moveToCategory(this.props.category.key);
        //this.props.onMoveToCategoryCallback(this.props.category.key);
    }

    render() {
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
                    {this.props.category.name}
                </span>
                {buttons}
                {this.props.category.categories &&
                <div className="categories">
                    <CategoryList list={this.props.category.categories}
                                  selectCategoryCallback={this.props.selectCategoryCallback}
                                  deleteCategory={(id) => this.deleteCategory(id)}
                                  onAddChildCallback={this.props.onAddChildCallback}
                                  onMoveToCategoryCallback={this.props.onMoveToCategoryCallback}
                                  editedTodo={this.props.editedTodo}
                    />
                </div>
                }
            </div>
        );
    }
}

Category.propTypes = {
    selectCategoryCallback: React.PropTypes.func,
    deleteCategory:  React.PropTypes.func,
    onAddChildCallback:  React.PropTypes.func,
    onMoveToCategoryCallback:  React.PropTypes.func
};

const mapStateToProps = (state) => ({
//    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (c) => {
        dispatch(deleteCategoryAction(c));
    },
    addCategory: (c, title) => {
        dispatch(addCategoryAction(c, title));
    },
    moveToCategory: (c) => {
        dispatch(moveToCategoryAction(c));
    },
    selectCategory: (c) => {
        dispatch(selectCategoryAction(c));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);