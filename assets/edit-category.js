var editFormContainer = document.getElementById('edit-form-container');
var btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');
var btnEditCat = document.querySelector('#btn-edit-cat');
var nameCategory = document.querySelectorAll('#name-category');
var formEditCategory = document.querySelectorAll('#form-edit-category');
console.log(nameCategory);
nameCategory.value = "jejeej";
//------------BUTTON CANCEL EDIT CATEGORY-------------
var goBackToAddCategory = function (event) {
    window.location.href = "./categories.html";
};
btnCnlEditCat.addEventListener('click', goBackToAddCategory);
//------------BUTTON EDIT CATEGORY-------------
var show = function () {
    var storage = goOnStorage();
    var pepe = localStorage.getItem('editedElement');
    nameCategory.value = "jejeej";
    console.log(nameCategory.value);
    console.log(pepe);
};
show();
// const editedCategoryName = (e) => {
//     e.preventDefault();
//     for(const element of storage.categories){
//     let pepe= localStorage.getItem('editedElement')
//     let nameCategory.innerHTML = pepe.name;
//     const newArray = storage.categories.map (item =>{
//         if(item.name === selectedElement){
//             return {...item, name: nameCategory.value, slug: slugify(nameCategory.value)}
//         }else{
//             return item;
//         }
//     });
//     storage.categories= newArray;
//     localStorage.setItem('full-storage', JSON.stringify(storage));
//     updateTableCategory();
// }
// btnEditCat.addEventListener('click', editedCategoryName);
