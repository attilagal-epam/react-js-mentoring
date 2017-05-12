export default (state = null, action) => {
    let categories;
    switch (action.type) {
        case 'CATEGORY_DELETE':
            const deleteCategory = (categories) => {
                categories.forEach(function (category, index, cats) {
                    if (category && category.categories.length) {
                        let subCategories = deleteCategory(category.categories);
                        category.categories = subCategories;
                    }
                    if (category && action.payload === category.Id) {
                        cats.splice(index, 1);
                    }
                });
                return categories;
            };
            categories = deleteCategory([...state]);
            return categories;

        case 'CATEGORY_ADD':
            const maxCategoryId = (categories) => {
                let maxId = 0;
                categories.forEach(function (category) {
                    let id;
                    if (category.categories.length) id = maxCategoryId(category.categories);
                    else id = category.Id;

                    if (id > maxId) maxId = id;
                });
                return maxId;
            }
            categories = [...state];
            let maxId = maxCategoryId(categories) + 1;

            if (action.payload.categoryId > 0) {
                const categoryId = action.payload.categoryId;

                const addSubCategory = (categories) => {
                    categories.forEach(function (category, index, cats) {
                        if (category && category.categories.length) {
                            let subCategories = addSubCategory(category.categories);
                            category.categories = subCategories;
                        }
                        if (category && categoryId === category.Id) {
                            category.categories.unshift({
                                'Id': maxId,
                                'parentId': 0,
                                'name': action.payload.name,
                                'categories': []
                            });
                        }
                    });
                    return categories;
                };
                categories = addSubCategory([...state]);
            } else {
                categories.unshift({
                    'Id': maxId,
                    'parentId': 0,
                    'name': action.payload.name,
                    'categories': []
                });
            }
            return categories;
        case 'CATEGORY_EDIT':
            const editCategory = (categories) => {
                categories.forEach(function (category, index, cats) {
                    if (category && category.categories.length) {
                        let subCategories = editCategory(category.categories);
                        category.categories = subCategories;
                    }
                    if (category && action.payload.category.Id === category.Id) {
                        cats[index].name = action.payload.name;
                    }
                });
                return categories;
            };
            categories = editCategory([...state])
            return categories;
        default:
            return state;
    }
}