export default (state = null, action) => {
    switch (action.type) {
        case 'CATEGORY_NEW_TITLE_CHANGED':
            return action.value;
        default:
            return state;
    }
}