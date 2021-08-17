const editFormContainer = document.getElementById('edit-form-container');
const btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');
const btnEditCat = document.querySelector('#btn-edit-cat');
const nameCategory = document.querySelectorAll('#name-category');
const formEditCategory = document.querySelectorAll('#form-edit-category');

console.log(nameCategory)
nameCategory.value = "jejeej";

//------------BUTTON CANCEL EDIT CATEGORY-------------

const goBackToAddCategory = (event) => {
    
    window.location.href="./categories.html";

}

btnCnlEditCat.addEventListener('click', goBackToAddCategory);

//------------BUTTON EDIT CATEGORY-------------

const show=()=> {

    const storage: LocalStorage = goOnStorage();

    const pepe = localStorage.getItem('editedElement')

    nameCategory.value = "jejeej";


    console.log(nameCategory.value);
    console.log(pepe)   

    
}
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
