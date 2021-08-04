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

    storage.categories.push(newCategoryAdded);

    localStorage.setItem('full-storage', JSON.stringify(storage));
}

formAddCategory.addEventListener('submit', addCategory);