const calculateProgress = (categories) => {
    return countCategories(categories);
};

const startValue = {
    finished : 0,
    count : 0
};

const countCategories = (categories) => {
    let result = {
        finished : 0,
        count : 0
    };
    categories.forEach(function (category, index, cats) {
        if (category && category.categories.length) {
            let subResult = countCategories(category.categories);
            result.finished += subResult.finished;
            result.count += subResult.count;
//            return;
        }
        result.count++;
        if (category.done) {
            result.finished++;
        }
    });
    return result;
};

const ReducerProgress = (state = startValue, action) => {
    switch (action.type) {
        case 'CALCULATE_PROGRESS':
            const categories = action.value;
            return calculateProgress(categories);
        default:
            return state;
    }
};

export default ReducerProgress;