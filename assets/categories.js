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
    location.reload();
};
formAddCategory.addEventListener('submit', addCategory);
//------------SHOW CATEGORY ADDED-------------
var tableCategory = document.getElementById('category-table');
var updateTableCategory = function () {
    var storage = goOnStorage();
    console.log(storage);
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var element = _a[_i];
        console.log(element);
        var newRow = document.createElement('tr');
        var newCategoryNameAdded = document.createElement('td');
        var newRowAction = document.createElement('td');
        var editAction = document.createElement('a');
        var deleteAction = document.createElement('a');
        editAction.setAttribute('href', 'https://www.youtube.com/');
        deleteAction.setAttribute('href', 'https://www.youtube.com/');
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
    }
};
var init = function () {
    updateTableCategory();
};
init();
