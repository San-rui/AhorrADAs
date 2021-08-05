//--------------TYPES---------------

type NewOp = {
    description?: string | number,
    amount: number,
    kind: string,
    category: string,
    dateLine: Date,
};

type NewCategory={
    name: string,
    slug: string,
}

type LocalStorage = {
    categories?:NewCategory[],
    newoperation: NewOp[],
};

//--------------FUNCTIONS---------------

//--------------LOCAL STORAGE FUNCTION-------

const goOnStorage = (): LocalStorage =>{
    let fullLocalStorage : LocalStorage = JSON.parse(localStorage.getItem('full-storage'));

    if(!fullLocalStorage) {
        fullLocalStorage = {
            categories:[{ name: "comida", slug: "comida"}, { name: "Servicios", slug: "servicios"},
            { name: "Salidas", slug: "salidas" },
            { name: "Educación", slug: "educación" }, { name: "Transporte", slug: "transporte" },
            { name: "Trabajo", slug: "trabajo" }],
            newoperation:[],
        } 
    };

    return fullLocalStorage;
};

//--------- FILTERS: SELECT CATEGORY-------------------

const loadFilterCategory = () => {

    const storage: LocalStorage = goOnStorage();

    const selectCategories = document.getElementById('category');

    for(const category of storage.categories) {

        const elem = document.createElement('option');
        elem.innerText = category.name;
        elem.value = category.slug;
        selectCategories.appendChild(elem);
    };
};
