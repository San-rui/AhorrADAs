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
var storage = goOnStorage();
var formAddCategory = document.getElementById('form-add-category');
var addCategory = function (e) {
    e.preventDefault();
    var storage = goOnStorage();
    var formNewCategory = e.target;
    var newCategoryName = formNewCategory.name.value;
    var newCategoryAdded = {
        id: getIdCat(),
        name: newCategoryName,
        slug: slugify(newCategoryName)
    };
    storage.categories.push(newCategoryAdded);
    localStorage.setItem('full-storage', JSON.stringify(storage));
    updateTableCategory();
};
formAddCategory.addEventListener('submit', addCategory);
//------------SHOW CATEGORY ADDED-------------
var tableCategory = document.getElementById('category-table');
var addCategoryContainer = document.getElementById('add-category-container');
var nameCat = document.querySelector('#name');
var updateTableCategory = function () {
    var storage = goOnStorage();
    tableCategory.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newCategoryNameAdded = document.createElement('td');
        var newRowAction = document.createElement('td');
        newCategoryNameAdded.setAttribute('id', element.slug);
        var editAction = document.createElement('a');
        var deleteAction = document.createElement('button');
        editAction.setAttribute('value', element.slug);
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
            var catToEdit = storage.categories.filter(function (item) { return element.name === item.name; });
            localStorage.setItem('editedElement', JSON.stringify(catToEdit));
            // nameCategory.values = element.name;
            // console.log(nameCategory)
            // console.log(element.name)
            // let nameCategorySelected= e.target.value;
            // let selectedElement= document.querySelector(`#${nameCategorySelected}`) ;
            // nameCategory.value= nameCategorySelected;
            // console.log(nameCategorySelected)
            // localStorage.setItem('editedElement', selectedElement.innerHTML);
            // console.log(selectedElement)
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
