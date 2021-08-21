//------------ VARIABLES-------------
var storage = goOnStorage();
var tableCategory = document.getElementById('category-table');
var addCategoryContainer = document.getElementById('add-category-container');
var formAddCategory = document.getElementById('form-add-category');
var nameCat = document.querySelector('#name');
//------------ ADD ID-------------
var getIdCat = function () {
    var storage = goOnStorage();
    if (storage.categories.length > 0) {
        var lastItem = storage.categories[storage.categories.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
//------------ ADD CATEGORY-------------
var myCategory = [];
for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
    var element = _a[_i];
    myCategory.push(element.slug);
}
;
var addCategory = function (e) {
    e.preventDefault();
    var storage = goOnStorage();
    var formNewCategory = e.target;
    var newCategoryName = formNewCategory.name.value;
    var slugName = slugify(newCategoryName);
    if (slugName == "") {
        console.log("este es el slug", slugName);
        return alert('No se puede generar una categoría sin nombre');
    }
    else if (myCategory.includes(slugName)) {
        nameCat.value = "";
        return alert('Esta categoría ya existe');
    }
    else if (!myCategory.includes(newCategoryName)) {
        var newCategoryAdded = {
            id: getIdCat(),
            name: newCategoryName,
            slug: slugify(newCategoryName)
        };
        storage.categories.push(newCategoryAdded);
        localStorage.setItem('full-storage', JSON.stringify(storage));
        nameCat.value = "";
        return updateTableCategory();
    }
    ;
};
formAddCategory.addEventListener('submit', addCategory);
//------------SHOW CATEGORY ADDED-------------
var updateTableCategory = function () {
    var storage = goOnStorage();
    tableCategory.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newCategoryNameAdded = document.createElement('td');
        var newRowAction = document.createElement('td');
        newRowAction.classList.add('text-end');
        newCategoryNameAdded.setAttribute('id', element.slug);
        var editAction = document.createElement('a');
        var deleteAction = document.createElement('button');
        editAction.setAttribute('name', element.slug);
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
            var newArray = storage.categories.filter(function (item) { return element.id !== item.id; });
            storage.categories = newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));
            updateTableCategory();
        };
        deleteAction.addEventListener('click', deleteCategory);
        var goToEditCategory = function (e) {
            var nameCategorySelected = e.target.name;
            var selectedElement = document.querySelector("#" + nameCategorySelected);
            localStorage.setItem('editedElement', selectedElement.innerHTML);
            var params = new URLSearchParams(window.location.search);
            editAction.setAttribute('href', "./edit-category.html?catId=" + element.id);
        };
        editAction.addEventListener('click', goToEditCategory);
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
