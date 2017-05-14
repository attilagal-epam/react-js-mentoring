import { combineReducers } from 'redux'
import ReducerTodos from './reducerTodos'
//import SelectedTodoReducer from './reduderSelectedTodo';
import ReducerCategories from './reducerCategories';
import ReducerSelectedCategory from './reducerSelectedCategory';
import ReducerEditTodo from './reducerEditTodo';

const todoAppReducer = combineReducers({
    todos: ReducerTodos,
//    selectedTodo: SelectedTodoReducer,
    categories: ReducerCategories,
    selectedCategory: ReducerSelectedCategory,
    editedTodo: ReducerEditTodo
});

export default todoAppReducer;