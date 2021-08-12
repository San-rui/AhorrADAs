//------------ ADD CATEGORY-------------
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var storage = goOnStorage();
var formAddCategory = document.getElementById('form-add-category');
var addCategory = function (e) {
    e.preventDefault();
    var storage = goOnStorage();
    var formNewCategory = e.target;
    var newCategoryName = formNewCategory.name.value;
    var newCategoryAdded = {
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
var editFormContainer = document.getElementById('edit-form-container');
var nameCategory = document.querySelector('#name-category');
var btnEditCat = document.querySelector('#btn-edit-cat');
var updateTableCategory = function () {
    var storage = goOnStorage();
    tableCategory.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newCategoryNameAdded = document.createElement('td');
        var newRowAction = document.createElement('td');
        newCategoryNameAdded.setAttribute('id', element.slug);
        var editAction = document.createElement('button');
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
            var newArray = storage.categories.filter(function (item) { return element.name !== item.name; });
            console.log(newArray);
            storage.categories = newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));
            updateTableCategory();
        };
        deleteAction.addEventListener('click', deleteCategory);
        var goToEditCategory = function (e) {
            var nameCategorySelected = e.target.value;
            var selectedElement = document.querySelector("#" + nameCategorySelected);
            addCategoryContainer.classList.add('hidden');
            editFormContainer.classList.remove('hidden');
            nameCategory.value = nameCategorySelected;
            localStorage.setItem('editedElement', selectedElement.innerHTML);
        };
        editAction.addEventListener('click', goToEditCategory);
        var editedCategoryName = function (e) {
            e.preventDefault();
            addCategoryContainer.classList.remove('hidden');
            editFormContainer.classList.add('hidden');
            var selectedElement = localStorage.getItem('editedElement');
            var newArray = storage.categories.map(function (item) {
                if (item.name === selectedElement) {
                    return __assign(__assign({}, item), { name: nameCategory.value, slug: slugify(nameCategory.value) });
                }
                else {
                    return item;
                }
            });
            storage.categories = newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));
            updateTableCategory();
        };
        btnEditCat.addEventListener('click', editedCategoryName);
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
var btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');
var goBackToAddCategory = function () {
    addCategoryContainer.classList.remove('hidden');
    editFormContainer.classList.add('hidden');
};
btnCnlEditCat.addEventListener('click', goBackToAddCategory);
