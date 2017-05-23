export default (state = null, action) => {
    switch (action.type) {
        case 'CATEGORY_NEW_TITLE_CHANGED':
            console.log('CATEGORY_NEW_TITLE_CHANGED  ', action.value)
            return action.value;
        default:
            return state;
    }
}