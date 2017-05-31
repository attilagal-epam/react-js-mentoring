const calculateProgress = (categories, todos) => {
    const categoryData = countCategories(categories, todos);
    return categoryData.finished / categoryData.count * 100;
};

const startValue = {
    finished : 0,
    count : 0
};

const getTodosCountByCategory = (categoryId, todos) => {
    return todos.filter((t) => t.categoryId === categoryId).length;
};

const getFinishedTodosCountByCategory = (categoryId, todos) => {
    return todos.filter((t) => t.categoryId === categoryId && t.done).length;
};

const countCategories = (categories, todos) => {
    let result = {
        finished : 0,
        count : 0
    };
//    categories.forEach(function (category, index, cats) {
    for (let i=0;i<categories.length;i++) {
        const category = categories[i];
        if (category && category.categories.length) {
            let subResult = countCategories(category.categories, todos);
            result.finished += subResult.finished;
            result.count += subResult.count;
        }
        result.count += getTodosCountByCategory(category.key, todos);
        result.finished += getFinishedTodosCountByCategory(category.key, todos);
    };
    return result;
};

const ReducerProgress = (state = startValue, action) => {
    switch (action.type) {
        case 'CALCULATE_PROGRESS':
            const categories = action.value.categories,
                todos = action.value.todos;
            return calculateProgress(categories, todos);
        default:
            return state;
    }
};

export default ReducerProgress;