const ReducerTodos = (state = [], action) => {
    let todos = [...state];
    switch (action.type) {
        case 'TODO_ADD':
                todos: [...action.value]
            return todos;
        case 'TODO_UPDATE':
            console.log('TODO UPDATE',  action.value);
            //  TODO: write the work
            todos = state.map(function (todo) {
                if (todo.key === action.value.key) {
                    todo.name = action.value.name;
                    todo.description = action.value.description;
                    todo.done = action.value.done;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        case 'TODO_MOVETOCATEGORY':
            todos = state.map(function (todo) {
                if (todo.key === action.value.key) {
                    todo.categoryID = action.value.categoryId;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        case 'TODO_FINISH':
            todos = state.map(function (todo, done) {
                if (todo.key === action.value.todo.key) {
                    todo.done = action.value.done;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        default:
            return state;
    }
};

//const undoableTodos = undoable(ReducerTodos, {
//    filter: distinctState()
//})
//
//export default undoableTodos;
export default ReducerTodos;