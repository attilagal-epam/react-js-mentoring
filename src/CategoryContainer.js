import Category from './Category';
import React from 'react';
import './Category.css';

class CategoryContainer extends React.Component {
    render() {
        return (
            <div className="categories">
                <CategoryList list={this.props.categories} />
            </div>
        );
    }
}

const CategoryList = ({list}) => (
    <div>{list.map((category) => <Category category={category} />)}</div>
);

export {CategoryList, CategoryContainer};