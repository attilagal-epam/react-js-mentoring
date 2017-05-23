export const deleteCategoryAction = (category) => {
    return {
        type: 'CATEGORY_DELETE',
        value: category
    }
};

export const addCategoryAction = (name, rootCategory) => {
    return {
        type: 'CATEGORY_ADD',
        value: {
            name,
            rootCategory
        }
    }
};

export const selectCategoryAction = (category) => {
    return {
        type: 'CATEGORY_SELECTED',
        value: category
    }
};

export const newCategoryTitleChangedAction = (categoryTitle) => {
    return {
        type: 'CATEGORY_NEW_TITLE_CHANGED',
        value: categoryTitle
    }
};