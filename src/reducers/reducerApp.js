import { combineReducers } from 'redux'
import ReducerTodos from './reducerTodos'
//import SelectedTodoReducer from './reduderSelectedTodo';
import ReducerCategories from './reducerCategories';
//import ReducerSelectedCategory from './ReducerSelectedCategory';
//import ReducerEditedCategory from './ReducerEditedCategory';

const todoAppReducer = combineReducers({
    todos: ReducerTodos,
//    selectedTodo: SelectedTodoReducer,
    categories: ReducerCategories,
    //selectedCategory: ReducerSelectedCategory,
    //editedCategory: ReducerEditedCategory
});

export default todoAppReducer;