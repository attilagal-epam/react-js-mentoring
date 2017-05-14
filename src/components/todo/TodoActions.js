export const addTodoAction = (todo) => {
    return {
        type: 'TODO_ADD',
        value: todo
    }
};

export const editTodoAction = (todo) => {
    return {
        type: 'TODO_EDIT',
        value: todo
    }
};

export const updateTodoAction = (todo) => {
    return {
        type: 'TODO_UPDATE',
        value: todo
    }
};

export const cancelEditTodoAction = (todo) => {
    return {
        type: 'TODO_CANCEL_EDIT',
        value: todo
    }
};

export const moveToCategoryAction = (targetCategory, todo) => {
    return {
        type: 'TODO_MOVETOCATEGORY',
        value: {
            targetCategory,
            todo
        }
    }
};

export const finishTodoAction = (todo, done) => {
    return {
        type: 'TODO_FINISH',
        value: { todo, done }
    }
};







export const deleteTodo = (todo) => {
    return {
        type: 'Todo_DELETE',
        value: todo
    }
};

export const selectTodo = (todo) => {
    return {
        type: 'Todo_SELECTED',
        value: todo
    }
};

export const unselectTodo = () => {
    return {
        type: 'Todo_UNSELECT'
    }
};

export const selectTodoToEdit = (todo) => {
    return {
        type: 'Todo_EDITED',
        value: todo
    }
};

export const unselectEditedTodo = () => {
    return {
        type: 'Todo_EDITED_UNSELECT'
    }
};

export const editTodo = (name, todo) => {
    return {
        type: 'Todo_EDIT',
        value: {
            name,
            todo
        }
    }
};