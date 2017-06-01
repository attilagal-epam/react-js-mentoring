import undoable, {distinctState} from 'redux-undo';

const todosDataSource = [
    {
        name: 'egy',
        key: '1',
        categoryId: '3.3',
        description: 'agsdgxdhbxfgncfncvhm',
        done: false
    },
    {
        name: 'kettő',
        key: '2',
        categoryId: '3.3',
        description: '',
        done: false
    },
    {
        name: 'három',
        key: '3',
        categoryId: '1',
        description: '',
        done: true
    },
    {
        name: 'négy',
        key: '4',
        categoryId: '3',
        description: '',
        done: false
    },
    {
        name: 'öt',
        key: '5',
        categoryId: '2',
        description: '',
        done: false
    }
];

const ReducerTodos = (state = todosDataSource, action) => {
    let todos;
    switch (action.type) {
        case 'TODO_ADD':
                todos = [...state];
                todos = [...todos, action.value];
            return todos;
        case 'TODO_UPDATE':
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
                if (todo.key === action.value.todo.key) {
                    todo.categoryId = action.value.targetCategory;
                    return todo;
                } else {
                    return todo;
                }
            });
            return todos;
        case 'TODO_FINISH':
            todos = state.map(function (todo) {
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

const undoableTodos = undoable(ReducerTodos, {
    filter: distinctState()
});

export default undoableTodos;