//------------ ADD CATEGORY-------------
var storage = goOnStorage();
var formAddCategory = document.getElementById('form-add-category');
var addCategory = function (e) {
    e.preventDefault();
    var formNewCategory = e.target;
    var newCategoryName = formNewCategory.name.value;
    var newCategoryAdded = {
        name: newCategoryName,
        slug: slugify(newCategoryName)
    };
    console.log(newCategoryAdded);
    storage.categories.push(newCategoryAdded);
    localStorage.setItem('full-storage', JSON.stringify(storage));
    updateTableCategory();
};
formAddCategory.addEventListener('submit', addCategory);
//------------SHOW CATEGORY ADDED-------------
var tableCategory = document.getElementById('category-table');
var updateTableCategory = function () {
    var storage = goOnStorage();
    console.log(storage);
    tableCategory.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newCategoryNameAdded = document.createElement('td');
        var newRowAction = document.createElement('td');
        var editAction = document.createElement('a');
        var deleteAction = document.createElement('button');
        editAction.setAttribute('href', 'https://www.youtube.com/');
        editAction.setAttribute('class', 'action-class');
        deleteAction.setAttribute('class', 'action-class');
        editAction.innerHTML = "Editar";
        deleteAction.innerHTML = "Eliminar";
        newCategoryNameAdded.innerHTML = element.name;
        newRowAction.appendChild(editAction);
        newRowAction.appendChild(deleteAction);
        newRow.appendChild(newCategoryNameAdded);
        newRow.appendChild(newRowAction);
        tableCategory.appendChild(newRow);
        var deleteCategory = function () {
            var newArray = storage.categories.filter(function (elemento) { return element.name !== elemento.name; });
            storage.categories = newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));
            updateTableCategory();
        };
        deleteAction.addEventListener('click', deleteCategory);
    };
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var element = _a[_i];
        _loop_1(element);
    }
};
var init = function () {
    updateTableCategory();
};
init();
