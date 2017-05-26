export default (state = null, action) => {
    switch (action.type) {
        case 'CATEGORY_SELECTED':
            console.log('CATEGORY_SELECTED  ', action.value)
            return action.value;
        case 'CATEGORY_UNSELECTED':
            console.log('CATEGORY_UNSELECTED  ', action.value)
            return null;
        default:
            return state;
    }
}