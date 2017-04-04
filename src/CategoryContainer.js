import Category from './Category';
import React from 'react';
import './Category.css';

class CategoryContainer extends React.Component {
    render() {
        return (
            <div className={this.props.isRoot ? 'categoriesRoot' : 'categories'}>
                    <CategoryList list={this.props.categories} />
            </div>
        );
    }
}

const CategoryList = ({list}) => (

    <div>
        {list.map((category) => <Category category={category} key={category.key} />)}
    </div>
);

export {CategoryList, CategoryContainer};