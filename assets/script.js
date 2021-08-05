//--------------TYPES---------------
//--------------FUNCTIONS---------------
//--------------LOCAL STORAGE FUNCTION-------
var goOnStorage = function () {
    var fullLocalStorage = JSON.parse(localStorage.getItem('full-storage'));
    if (!fullLocalStorage) {
        fullLocalStorage = {
            categories: [{ name: "comida", slug: "comida" }, { name: "Servicios", slug: "servicios" },
                { name: "Salidas", slug: "salidas" },
                { name: "Educación", slug: "educación" }, { name: "Transporte", slug: "transporte" },
                { name: "Trabajo", slug: "trabajo" }],
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
