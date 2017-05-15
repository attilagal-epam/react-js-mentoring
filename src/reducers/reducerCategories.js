const findCategory= (rootCategories, categoryId) => {
    for (let i=0; i<rootCategories.length; i++) {
        if (rootCategories[i].key === categoryId) {
            return rootCategories[i];
        }
        else if (rootCategories[i].categories.length > 0) {
            const retVal = this.findCategory(rootCategories[i].categories, categoryId);
            if (retVal) {
                return retVal;
            }
        }
    }
};

const insertCategory = (categoryTitle, parentCategory) => {
    const newCategory = {
        name: categoryTitle,
        key: Date.now(),
        categories: [],
        done: false
    };

    const rootCategories = this.state.categories;
    let categories = parentCategory ? parentCategory.categories : this.state.categories;
    categories.unshift(newCategory);
    this.setState({categories: rootCategories});
};

const addRootCategory = (categoryTitle) => {
    this.insertCategory(this.selectedCategoryInput.value);
};

const addCategory = (parentCategory) => {
    this.insertCategory(this.selectedCategoryInput.value, parentCategory);
};

const categoryDataSource = [
    {
        name: 'egyes',
        key: '1',
        categories: [],
        done: false
    },
    {
        name: 'kettes',
        key: '2',
        categories: [],
        done: false
    },
    {
        name: 'hármas',
        key: '3',
        categories: [
            {
                name: '3.1',
                key: '3.1',
                categories: [],
                done: false
            },
            {
                name: '3.2',
                key: '3.2',
                categories: [
                    {
                        name: '3.2.1',
                        key: '3.2.1',
                        categories: [],
                        done: false
                    }
                ]
            },
            {
                name: '3.3',
                key: '3.3',
                categories: [],
                done: false
            }
        ],
        done: false
    }
];



export default (state = categoryDataSource, action) => {
    let categories = [...state];
    switch (action.type) {
        case 'CATEGORY_DELETE':
            console.log('DELETE  ', action.value);
            const category = action.value;
            //  TODO recursion
            return state.filter(t => t.key !== category.key);


            //const deleteCategory = (categories) => {
            //    categories.forEach(function (category, index, cats) {
            //        if (category && category.categories.length) {
            //            let subCategories = deleteCategory(category.categories);
            //            category.categories = subCategories;
            //        }
            //        if (category && action.payload === category.Id) {
            //            cats.splice(index, 1);
            //        }
            //    });
            //    return categories;
            //};
            //categories = deleteCategory([...state]);
            //return categories;
//            return state;
        case 'CATEGORY_ADD':
            //const maxCategoryId = (categories) => {
            //    let maxId = 0;
            //    categories.forEach(function (category) {
            //        let id;
            //        if (category.categories.length) id = maxCategoryId(category.categories);
            //        else id = category.Id;
            //
            //        if (id > maxId) maxId = id;
            //    });
            //    return maxId;
            //}
            //let maxId = maxCategoryId(categories) + 1;
            //
            //if (action.payload.categoryId > 0) {
            //    const categoryId = action.payload.categoryId;
            //
            //    const addSubCategory = (categories) => {
            //        categories.forEach(function (category, index, cats) {
            //            if (category && category.categories.length) {
            //                let subCategories = addSubCategory(category.categories);
            //                category.categories = subCategories;
            //            }
            //            if (category && categoryId === category.Id) {
            //                category.categories.unshift({
            //                    'Id': maxId,
            //                    'parentId': 0,
            //                    'name': action.payload.name,
            //                    'categories': []
            //                });
            //            }
            //        });
            //        return categories;
            //    };
            //    categories = addSubCategory([...state]);
            //} else {
            //    categories.unshift({
            //        'Id': maxId,
            //        'parentId': 0,
            //        'name': action.payload.name,
            //        'categories': []
            //    });
            //}
            return categories;
        case 'CATEGORY_EDIT':
            //const editCategory = (categories) => {
            //    categories.forEach(function (category, index, cats) {
            //        if (category && category.categories.length) {
            //            let subCategories = editCategory(category.categories);
            //            category.categories = subCategories;
            //        }
            //        if (category && action.payload.category.Id === category.Id) {
            //            cats[index].name = action.payload.name;
            //        }
            //    });
            //    return categories;
            //};
            //categories = editCategory([...state])
            return categories;
        case 'CATEGORY_MOVETO':
            console.log('action value:  ', action.value);
            return categories;
        default:
            return state;
    }
}