export default (state = null, action) => {
    switch (action.type) {
        case 'TODO_EDIT':
            console.log('TODO_EDITED  ', action.value)
            return action.value;
        case 'TODO_EDIT_CANCEL':
            return null;
        default:
            return state;
    }
}