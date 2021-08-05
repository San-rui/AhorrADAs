var goOnStorage = function () {
    var fullLocalStorage = JSON.parse(localStorage.getItem('full-storage'));
    if (!fullLocalStorage) {
        fullLocalStorage = {
            categories: [],
            newoperation: []
        };
    }
    return fullLocalStorage;
};
