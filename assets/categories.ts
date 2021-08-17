//------------ ADD ID-------------

const getIdCat = () => {

    const storage: LocalStorage = goOnStorage();

    if(storage.categories.length > 0) {
    const lastItem = storage.categories[storage.categories.length -1];
    return lastItem.id + 1;
    } 

    return 1;
}

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
const nameCat = document.querySelector('#name');

const updateTableCategory = ()=> {

    const storage: LocalStorage = goOnStorage();

    tableCategory.innerHTML="";
    for(const element of storage.categories){

        const newRow= document.createElement('tr');
        const newCategoryNameAdded= document.createElement('td');
        const newRowAction= document.createElement('td');

        newCategoryNameAdded.setAttribute('id', element.slug)
        
        const editAction =document.createElement('a');

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

            storage.categories=newArray;

            localStorage.setItem('full-storage', JSON.stringify(storage));

            updateTableCategory();
        };

        deleteAction.addEventListener('click', deleteCategory);


        const goToEditCategory = (e) => {


            const catToEdit= storage.categories.filter(item => element.name === item.name);

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

            const params= new URLSearchParams(window.location.search);
            editAction.setAttribute('href', `./edit-category.html?catId=${element.id}`)

        };

        editAction.addEventListener('click', goToEditCategory);

    }

};

const init = () => {
    updateTableCategory()
};

init();

