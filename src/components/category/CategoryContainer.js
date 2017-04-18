import Category from './Category';
import React from 'react';
import './Category.css';

class CategoryContainer extends React.Component {
    render() {
        return (
            <div className={this.props.isRoot ? 'categoriesRoot' : 'categories'}>
                    <CategoryList
                        list={this.props.categories}
                        selectCategoryCallback={this.props.selectCategoryCallback}
                    />
            </div>
        );
    }
}

const CategoryList = ({list, selectCategoryCallback}) => (
    <div>
        {list.map((category) => <Category
                                    category={category} key={category.key}
                                    selectCategoryCallback={selectCategoryCallback} />)}
    </div>
);

export {CategoryList, CategoryContainer};