import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import './Category.css';

class CategoryContainerClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: props.categories
        };
    }

    render() {
        return (
            <div className={this.props.isRoot ? 'categoriesRoot' : 'categories'}>
                <CategoryList
                    list={this.props.categories}
                    selectCategoryCallback={this.props.selectCategoryCallback}
                    onDeleteCallback={this.props.onDeleteCallback}
                    onAddChildCallback={this.props.onAddChildCallback}
                    onMoveToCategoryCallback={this.props.onMoveToCategoryCallback}
                    editedTodo={this.props.editedTodo}
                />
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

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (c) => {
        //dispatch(selectTodo(todo));
        console.log(c, ' deleted');
    }
});

const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryContainerClass)
export {CategoryList, CategoryContainer};