import Category from './Category';
import React from 'react';
import './Category.css';

class CategoryContainer extends React.Component {
    render() {
        return (
            <div className={this.props.isRoot ? 'categoriesRoot' : 'categories'}>
            </div>
        );
    }
}

const CategoryList = ({list, selectCategoryCallback, onDeleteCallback, onAddChildCallback, editedTodo, onMoveToCategoryCallback}) => (
    <div>
        {list.map((category) => <Category
                                    category={category}
                                    key={category.key}
                                    selectCategoryCallback={selectCategoryCallback}
                                    onDeleteCallback={onDeleteCallback}
                                    onAddChildCallback={onAddChildCallback}
                                    onMoveToCategoryCallback={onMoveToCategoryCallback}
                                    editedTodo={editedTodo}
        />)}
    </div>
);

export {CategoryList, CategoryContainer};


/*
<CategoryList
    list={this.props.categories}
    selectCategoryCallback={this.props.selectCategoryCallback}
    onDeleteCallback={this.props.onDeleteCallback}
    onAddChildCallback={this.props.onAddChildCallback}
    onMoveToCategoryCallback={this.props.onMoveToCategoryCallback}
    editedTodo={this.props.editedTodo}
/>
*/
