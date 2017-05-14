export default (state = null, action) => {
    switch (action.type) {
        case 'TODO_EDIT':
            return action.value;
        case 'TODO_CANCEL_EDIT':
            return null;
        default:
            return state;
    }
}