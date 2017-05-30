import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import ReducerTodos from './reducerTodos';
//import SelectedTodoReducer from './reduderSelectedTodo';
import ReducerCategories from './reducerCategories';
import ReducerNewCategoryTitleChanged from './reducerNewCategoryTitleChanged';
import ReducerSelectedCategory from './reducerSelectedCategory';
import ReducerEditTodo from './reducerEditTodo';
import ReducerTodosFilterChanged from './reducerTodosFilterChanged';
import ReducerProgress from './reducerProgress';

const todoAppReducer = combineReducers({
    todos: undoable(ReducerTodos),
//    selectedTodo: SelectedTodoReducer,
    categories: ReducerCategories,
    selectedCategory: ReducerSelectedCategory,
    editedTodo: ReducerEditTodo,
    newCategoryTitle: ReducerNewCategoryTitleChanged,
    todosFilter: ReducerTodosFilterChanged,
    progress: ReducerProgress
});

export default todoAppReducer;