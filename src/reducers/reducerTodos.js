const ReducerTodos = (state = null, action) => {
    let todos;
    switch (action.type) {
        case 'TODO_UPDATE':
            todos = state.map(function (todo) {
                if (todo.id === action.payload.id) {
                    todo.name = action.payload.name;
                    todo.description = action.payload.description;
                    todo.done = action.payload.done;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        case 'TODO_MOVE':
            todos = state.map(function (todo) {
                if (todo.id === action.payload.todoId) {
                    todo.categoryID = action.payload.categoryId;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        case 'TODO_ADD':
            todos = [...state];
            let maxId = 0;
            todos.forEach((todo) => {
                if (todo.id > maxId) maxId = todo.id;
            });
            todos.unshift({
                id: maxId + 1,
                categoryID: action.payload.categoryId,
                name: action.payload.name,
                done: false
            });
            return todos;
        case 'TODOS_DELETE_BYCATEGORY':
            todos = state.filter((todo) => {
                return (todo.categoryID !== action.payload);
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