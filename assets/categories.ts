//------------ VARIABLES-------------
let storage: LocalStorage = goOnStorage();
const tableCategory = document.getElementById('category-table');
const addCategoryContainer = document.getElementById('add-category-container');
const formAddCategory=document.getElementById('form-add-category');
const nameCat = document.querySelector('#name');

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

let myCategory=[];

for ( const element of storage.categories){
    myCategory.push(element.slug);
};

const addCategory =(e)=>{
    e.preventDefault();

    const storage: LocalStorage = goOnStorage();
    
    const formNewCategory = e.target;

    const newCategoryName: string = formNewCategory.name.value;
    const slugName = slugify(newCategoryName);

    
    if(slugName ==""){
        console.log("este es el slug", slugName)
        return alert ('No se puede generar una categoría sin nombre');
    } else if (myCategory.includes(slugName)){
            nameCat.value = "";
            return alert ('Esta categoría ya existe');
            
        } else if (!myCategory.includes(newCategoryName)){
            
            const newCategoryAdded: NewCategory = {
                id: getIdCat(),
                name: newCategoryName,
                slug: slugify(newCategoryName), 
            }

                storage.categories.push(newCategoryAdded);
                localStorage.setItem('full-storage', JSON.stringify(storage));
                nameCat.value = "";

                return updateTableCategory();
        } ;
    

};
formAddCategory.addEventListener('submit', addCategory);

//------------SHOW CATEGORY ADDED-------------
const updateTableCategory = ()=> {

    const storage: LocalStorage = goOnStorage();

    tableCategory.innerHTML="";

    for(const element of storage.categories){

        const newRow= document.createElement('tr');
        const newCategoryNameAdded= document.createElement('td');
        const newRowAction= document.createElement('td');
        newRowAction.classList.add('text-end')

        newCategoryNameAdded.setAttribute('id', element.slug);
        const editAction =document.createElement('a');
        const deleteAction =document.createElement('button');
        editAction.setAttribute('name', element.slug);
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
            let nameCategorySelected= e.target.name;
            let selectedElement= document.querySelector(`#${nameCategorySelected}`) ;
            localStorage.setItem('editedElement', selectedElement.innerHTML);

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

