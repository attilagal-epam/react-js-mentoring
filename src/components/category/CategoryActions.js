export const deleteCategoryAction = (category) => {
    return {
        type: 'CATEGORY_DELETE',
        value: category
    }
};

export const addCategoryAction = (rootCategory, name) => {
    return {
        type: 'CATEGORY_ADD',
        value: {
            name,
            rootCategory
        }
    }
};

export const moveToCategoryAction = (targetCategory, todo) => {
    return {
        type: 'CATEGORY_MOVETO',
        value: {
            targetCategory,
            todo
        }
    }
};

export const selectCategoryAction = (category) => {
    return {
        type: 'CATEGORY_SELECTED',
        value: category
    }
};

export const unselectCategory = () => {
    return {
        type: 'CATEGORY_UNSELECT'
    }
};

export const selectCategoryToEdit = (category) => {
    return {
        type: 'CATEGORY_EDITED',
        value: category
    }
};

export const unselectEditedCategory = () => {
    return {
        type: 'CATEGORY_EDITED_UNSELECT'
    }
};

export const editCategory = (name, category) => {
    return {
        type: 'CATEGORY_EDIT',
        value: {
            name,
            category
        }
    }
};