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
    id:string,
    name: string,
    slug: string,
}

type Filter ={
    kind: string,
    categories: string,
    from: string, 
    orderBy: string,
}

type LocalStorage = {
    categories?:NewCategory[],
    newoperation?: NewOp[],
    //filters?: Filter,
};


//--------------FUNCTIONS---------------

let date:Date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1
let year = date.getFullYear()

const functionDate =()=>{

    let newDate = year.toString()+ '-' +('0' + month).slice(-2).toString() + '-' + ('0' + day).slice(-2).toString();
    return newDate;
}
functionDate();

//--------------LOCAL STORAGE FUNCTION-------

const goOnStorage = (): LocalStorage =>{
    let fullLocalStorage : LocalStorage = JSON.parse(localStorage.getItem('full-storage'));

    if(!fullLocalStorage) {
        fullLocalStorage = {
            categories:[{ id:"comida", name: "Comida", slug: "comida"}, {id:"servicios",  name: "Servicios", slug: "servicios"},
            {id:"salidas", name: "Salidas", slug: "salidas" },
            {id:"educación", name: "Educación", slug: "educación" }, {id:"transporte" , name: "Transporte", slug: "transporte" },
            {id:"trabajo", name: "Trabajo", slug: "trabajo" }],
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

const storage: LocalStorage = goOnStorage();


const getFilterFromStorage =(): Filter=>{

    let myFilters: Filter =JSON.parse(localStorage.getItem('storage-filters'));

    if(!myFilters){
        myFilters ={
            kind: "todos",
            categories: "todas",
            from: functionDate(),
            orderBy: "mas-reciente",
        }
    }

    

    return myFilters
}

getFilterFromStorage();


