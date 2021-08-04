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
    storage.categories.push(newCategoryAdded);
    localStorage.setItem('full-storage', JSON.stringify(storage));
};
formAddCategory.addEventListener('submit', addCategory);
