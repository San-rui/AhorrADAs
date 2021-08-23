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
//-----------VARIABLES-------------
var btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');
var btnEditCat = document.querySelector('#btn-edit-cat');
var nameCategory = document.getElementById('name-category');
var catToEdit = localStorage.getItem('editedElement');
nameCategory.value = catToEdit;
//-----------BUTTON EDIT CATEGORY-------------
var editedCategoryName = function (e) {
    e.preventDefault();
    var storage = goOnStorage();
    var myCategoryList = [];
    for (var _i = 0, _a = storage.categories; _i < _a.length; _i++) {
        var element = _a[_i];
        myCategoryList.push(element.slug);
    }
    ;
    console.log(myCategoryList);
    console.log("", nameCategory.value);
    var slugNameCategory = slugify(nameCategory.value);
    if (myCategoryList.includes(slugNameCategory)) {
        nameCategory.value = catToEdit;
        console.log("soy true");
        return alert('Esta categoría ya existe');
    }
    else if (!myCategoryList.includes(slugNameCategory)) {
        var newArray = storage.categories.map(function (item) {
            if (item.name === catToEdit) {
                return __assign(__assign({}, item), { name: nameCategory.value, slug: slugify(nameCategory.value) });
            }
            else {
                return item;
            }
        });
        storage.categories = newArray;
        localStorage.setItem('full-storage', JSON.stringify(storage));
        window.location.href = "./categories.html";
    }
    ;
};
btnEditCat.addEventListener('click', editedCategoryName);
//------------BUTTON CANCEL EDIT CATEGORY-------------
var goBackToAddCategory = function (event) {
    window.location.href = "./categories.html";
};
btnCnlEditCat.addEventListener('click', goBackToAddCategory);
