//--------------TYPES---------------
//--------------FUNCTIONS---------------
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var functionDate = function () {
    var newDate = year.toString() + '-' + ('0' + month).slice(-2).toString() + '-' + ('0' + day).slice(-2).toString();
    return newDate;
};
functionDate();
//--------------LOCAL STORAGE FUNCTION-------
var goOnStorage = function () {
    var fullLocalStorage = JSON.parse(localStorage.getItem('full-storage'));
    if (!fullLocalStorage) {
        fullLocalStorage = {
            categories: [{ id: "comida", name: "Comida", slug: "comida" }, { id: "servicios", name: "Servicios", slug: "servicios" },
                { id: "salidas", name: "Salidas", slug: "salidas" },
                { id: "educación", name: "Educación", slug: "educación" }, { id: "transporte", name: "Transporte", slug: "transporte" },
                { id: "trabajo", name: "Trabajo", slug: "trabajo" }],
            newoperation: []
        };
    }
    ;
    return fullLocalStorage;
};
//--------- FILTERS: SELECT CATEGORY-------------------
var loadFilterCategory = function () {
    var storage = goOnStorage();
    var selectCategories = document.getElementById('category');
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.slug;
        selectCategories.appendChild(elem);
    }
    ;
};
var storage = goOnStorage();
var getFilterFromStorage = function () {
    var myFilters = JSON.parse(localStorage.getItem('storage-filters'));
    if (!myFilters) {
        myFilters = {
            kind: "todos",
            categories: "todas",
            from: functionDate(),
            orderBy: "mas-reciente"
        };
    }
    return myFilters;
};
getFilterFromStorage();
