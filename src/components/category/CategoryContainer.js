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
                        onDeleteCallback={this.props.onDeleteCallback}
                        onAddChildCallback={this.props.onAddChildCallback}
                    />
            </div>
        );
    }
}

const CategoryList = ({list, selectCategoryCallback, onDeleteCallback, onAddChildCallback}) => (
    <div>
        {list.map((category) => <Category
                                    category={category}
                                    key={category.key}
                                    selectCategoryCallback={selectCategoryCallback}
                                    onDeleteCallback={onDeleteCallback}
                                    onAddChildCallback={onAddChildCallback}
        />)}
    </div>
);

export {CategoryList, CategoryContainer};