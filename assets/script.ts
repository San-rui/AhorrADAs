//--------------TYPES---------------

type NewOp = {
    id: number
    description?: string | number,
    amount: number,
    kind: string,
    category: string,
    dateLine: Date,
};

type NewCategory={
    id:number
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
            categories:[{ id:1 , name: "Comida", slug: "comida"}, {id:2,  name: "Servicios", slug: "servicios"},
            {id:3, name: "Salidas", slug: "salidas" },
            {id:4, name: "Educación", slug: "educación" }, {id:5, name: "Transporte", slug: "transporte" },
            {id:6, name: "Trabajo", slug: "trabajo" }],
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
