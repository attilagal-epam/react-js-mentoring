import React from 'react';
import {CategoryList} from './CategoryContainer';

class Category extends React.Component {
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.selectCategoryCallback(this.props.category.key)
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
                    <i className="fa fa-trash-o toolButton"></i>
                    <i className="fa fa-plus toolButton"></i>
                </div>
                {this.props.category.categories &&
                <div className="categories">
                    <CategoryList list={this.props.category.categories}
                                  selectCategoryCallback={this.props.selectCategoryCallback} />
                </div>
                }
            </div>
        );
    }
}

Category.propTypes = {
    selectCategoryCallback: React.PropTypes.func
};

export default Category;
