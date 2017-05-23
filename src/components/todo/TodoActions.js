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

export const finishEditTodoAction = (todo) => {
    return {
        type: 'TODO_FINISH_EDIT',
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

export const todosFilterChangedAction = (todosFilter) => {
    return {
        type: 'TODO_FILTER_CHANGED',
        value: todosFilter
    }
};