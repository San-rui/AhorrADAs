//------------ ADD CATEGORY-------------

let storage: LocalStorage = goOnStorage();
const formAddCategory=document.getElementById('form-add-category');

const addCategory =(e)=>{
    e.preventDefault();

    const formNewCategory = e.target;

    const newCategoryName: string = formNewCategory.name.value;

    const newCategoryAdded: NewCategory = {
            name: newCategoryName,
            slug: slugify(newCategoryName), 
    }
    console.log(newCategoryAdded);

    storage.categories.push(newCategoryAdded);

    localStorage.setItem('full-storage', JSON.stringify(storage));
    updateTableCategory();

};
formAddCategory.addEventListener('submit', addCategory);

//------------SHOW CATEGORY ADDED-------------

const tableCategory = document.getElementById('category-table');

const updateTableCategory = ()=> {

    const storage: LocalStorage = goOnStorage();
    console.log(storage);
    tableCategory.innerHTML="";
    for(const element of storage.categories){

        const newRow= document.createElement('tr');
        const newCategoryNameAdded= document.createElement('td');
        const newRowAction= document.createElement('td');
        
        const editAction =document.createElement('a');
        const deleteAction =document.createElement('button');
        
        editAction.setAttribute('href','https://www.youtube.com/');
        editAction.setAttribute('class','action-class');
        deleteAction.setAttribute('class','action-class');

        editAction.innerHTML="Editar";
        deleteAction.innerHTML="Eliminar";
        newCategoryNameAdded.innerHTML = element.name;
        
        newRowAction.appendChild(editAction);
        newRowAction.appendChild(deleteAction);
        newRow.appendChild(newCategoryNameAdded);
        newRow.appendChild(newRowAction);
        
        tableCategory.appendChild(newRow);
        
        const deleteCategory = () => {
            const newArray= storage.categories.filter(elemento => element.name !== elemento.name);
            storage.categories=newArray;

            localStorage.setItem('full-storage', JSON.stringify(storage));

            updateTableCategory();
        }
        deleteAction.addEventListener('click', deleteCategory)
    }
    

};

const init = () => {
    updateTableCategory()
};

init();



