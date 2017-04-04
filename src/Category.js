import React from 'react';
import {CategoryList} from './CategoryContainer';


class Category extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="category">
                <div className="categoryTitle">
                    {this.props.category.name}
                </div>
                <button className="editCategory">E</button>
                <div className="categoryButtons">
                    <button>D</button><button>A</button>
                </div>
            </div>
        );
    }
}

export default Category;

/*
{this.props.category.categories &&
<div className="categories">
    <CategoryList list={this.props.category.categories}/>
</div>
}
*/
