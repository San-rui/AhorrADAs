//------------ ADD CATEGORY-------------

let storage: LocalStorage = goOnStorage();
const formAddCategory=document.getElementById('form-add-category');


const addCategory =(e)=>{
    e.preventDefault();

    const storage: LocalStorage = goOnStorage();
    
    const formNewCategory = e.target;

    const newCategoryName: string = formNewCategory.name.value;

    const newCategoryAdded: NewCategory = {
            id: getIdCat(),
            name: newCategoryName,
            slug: slugify(newCategoryName), 
    }

    storage.categories.push(newCategoryAdded);

    localStorage.setItem('full-storage', JSON.stringify(storage));
    updateTableCategory();

};
formAddCategory.addEventListener('submit', addCategory);

//------------SHOW CATEGORY ADDED-------------

const tableCategory = document.getElementById('category-table');
const addCategoryContainer = document.getElementById('add-category-container');
const editFormContainer = document.getElementById('edit-form-container');
const nameCategory = document.querySelector('#name-category');
const btnEditCat = document.querySelector('#btn-edit-cat');

const updateTableCategory = ()=> {

    const storage: LocalStorage = goOnStorage();

    tableCategory.innerHTML="";
    for(const element of storage.categories){

        const newRow= document.createElement('tr');
        const newCategoryNameAdded= document.createElement('td');
        const newRowAction= document.createElement('td');

        newCategoryNameAdded.setAttribute('id', element.slug)
        
        const editAction =document.createElement('button');
        const deleteAction =document.createElement('button');
        
        editAction.setAttribute('value', element.slug);
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
            const newArray= storage.categories.filter(item => element.id !== item.id);

            console.log(newArray);
            storage.categories=newArray;

            localStorage.setItem('full-storage', JSON.stringify(storage));

            updateTableCategory();
        };

        deleteAction.addEventListener('click', deleteCategory);


        const goToEditCategory = (e) => {
            
            let nameCategorySelected= e.target.value;

            let selectedElement= document.querySelector(`#${nameCategorySelected}`) ;

            addCategoryContainer.classList.add('hidden');
            editFormContainer.classList.remove('hidden');

            nameCategory.value= nameCategorySelected;

            localStorage.setItem('editedElement', selectedElement.innerHTML);
            
        };

        editAction.addEventListener('click', goToEditCategory);


        const editedCategoryName = (e) => {
            e.preventDefault();

            addCategoryContainer.classList.remove('hidden');
            editFormContainer.classList.add('hidden');

            let selectedElement= localStorage.getItem('editedElement');
            
            const newArray = storage.categories.map (item =>{
                
                if(item.name === selectedElement){
                    return {...item, name: nameCategory.value, slug: slugify(nameCategory.value)}
                }else{
                    return item;
                }
            });

            storage.categories= newArray;
            localStorage.setItem('full-storage', JSON.stringify(storage));

            updateTableCategory();
        }
        btnEditCat.addEventListener('click', editedCategoryName);
    }
};

const init = () => {
    updateTableCategory()
};

init();

const btnCnlEditCat = document.querySelector('#btn-cnl-edit-cat');

const goBackToAddCategory = () => {

    addCategoryContainer.classList.remove('hidden');
    editFormContainer.classList.add('hidden');
}

btnCnlEditCat.addEventListener('click', goBackToAddCategory);

const getIdCat = () => {

    const storage: LocalStorage = goOnStorage();

    if(storage.categories.length > 0) {
    const lastItem = storage.categories[storage.categories.length -1];
    return lastItem.id + 1;
    } 

    return 1;
}
