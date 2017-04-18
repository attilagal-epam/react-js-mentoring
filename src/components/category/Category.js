import React from 'react';
import {CategoryList} from './CategoryContainer';

class Category extends React.Component {
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.selectCategoryCallback(this.props.category.key);
    }

    handleDeleteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onDeleteCallback(this.props.category.key);
    }

    handleAddChildClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onAddChildCallback(this.props.category);
    }

    render() {
        return (
            <div className="category"
                 onClick={this.handleClick.bind(this)}>
                <span className="categoryTitle">
                    {this.props.category.name}
                </span>
                <div className="categoryButtons">
                    <i className="fa fa-pencil-square-o categoryEdit"></i>
                    <i className="fa fa-trash-o toolButton"
                       onClick={this.handleDeleteClick.bind(this)}></i>
                    <i className="fa fa-plus toolButton"
                       onClick={this.handleAddChildClick.bind(this)}></i>
                </div>
                {this.props.category.categories &&
                <div className="categories">
                    <CategoryList list={this.props.category.categories}
                                  selectCategoryCallback={this.props.selectCategoryCallback}
                                  onDeleteCallback={this.props.onDeleteCallback}
                                  onAddChildCallback={this.props.onAddChildCallback}/>
                </div>
                }
            </div>
        );
    }
}

Category.propTypes = {
    selectCategoryCallback: React.PropTypes.func,
    onDeleteCallback:  React.PropTypes.func,
    onAddChildCallback:  React.PropTypes.func
};

export default Category;
