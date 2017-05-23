export default (state = null, action) => {
    switch (action.type) {
        case 'TODO_FILTER_CHANGED':
            console.log('TODO_FILTER_CHANGED  ', action.value)
            return action.value;
        default:
            return state;
    }
}