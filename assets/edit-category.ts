//-----------VARIABLES-------------
const btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');
const btnEditCat = document.querySelector('#btn-edit-cat');
const nameCategory = document.getElementById('name-category');


const catToEdit = localStorage.getItem('editedElement');
nameCategory.value = catToEdit;

//-----------BUTTON EDIT CATEGORY-------------

const editedCategoryName = (e) => {
    e.preventDefault();

    let storage: LocalStorage = goOnStorage(); 

    for(const element of storage.categories){
        if (element.name === nameCategory.value){
            nameCategory.value = catToEdit;
            return alert ('Esta categoría ya existe');
            
        } else if (element.name !== nameCategory.value){
            const newArray = storage.categories.map (item =>{
                
                if(item.name === catToEdit){
                    return {...item, name: nameCategory.value, slug: slugify(nameCategory.value)}
                }else{
                    return item;
                }
            });
        
            storage.categories = newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));
        
            window.location.href="./categories.html"; 
            
        }
    }
}
btnEditCat.addEventListener('click', editedCategoryName);

//------------BUTTON CANCEL EDIT CATEGORY-------------

const goBackToAddCategory = (event) => { 
    window.location.href="./categories.html";
}
btnCnlEditCat.addEventListener('click', goBackToAddCategory);
