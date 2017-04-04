import React from 'react';

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
            </div>
        );
    }
}

export default Category;

/*
 <button className="editCategory">E</button>
{this.props.category.categories &&
<div className="categories">
    <CategoryList list={this.props.category.categories}/>
</div>
}
*/
