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
            const deleteCategory = (categories, categoryToDelete) => {
                categories.forEach(function (category, index, cats) {
                    if (category && category.categories.length) {
                        let subCategories = deleteCategory(category.categories, categoryToDelete);
                        category.categories = subCategories;
                    }
                    if (category && categoryToDelete.key === category.key) {    //  TODO: delete 3.2.1 nem frissul
                        cats.splice(index, 1);
                    }
                });
                return categories;
            };
            categories = deleteCategory([...state], category);
            return categories;
        case 'CATEGORY_ADD':
                const newCategory = {
                    name: action.value.name,
                    key: Date.now(),
                    categories: [],
                    done: false
                };

                let newCategories = action.value.rootCategory ? action.value.rootCategory.categories : categories;
                newCategories.unshift(newCategory);
            return categories;
        case 'CATEGORY_EDIT':
            return categories;
        case 'CATEGORY_MOVETO':
            return categories;
        case 'CATEGORY_SET_DONE':
            return categories.map(function (c) {
                if (c.key === action.value.categoryId) {
                    c.done = action.value.done;
                    return c;
                } else {
                    return c;
                }
            });
        default:
            return state;
    }
}