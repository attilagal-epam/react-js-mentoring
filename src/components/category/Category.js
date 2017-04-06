import React from 'react';
import {CategoryList} from './CategoryContainer';


class Category extends React.Component {
    render() {
        return (
            <div className="category">
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
                    <CategoryList list={this.props.category.categories}/>
                </div>
                }
            </div>
        );
    }
}

export default Category;
