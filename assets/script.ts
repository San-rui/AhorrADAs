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

type Filter ={
    kind: string[],
    categories: NewCategory[],
    from: string | number, 
    orderBy: string[],
}

type LocalStorage = {
    categories?:NewCategory[],
    newoperation?: NewOp[],
    filters?: Filter,
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
            categories:[{ id:1 , name: "Comida", slug: "comida"}, {id:2,  name: "Servicios", slug: "servicios"},
            {id:3, name: "Salidas", slug: "salidas" },
            {id:4, name: "Educación", slug: "educación" }, {id:5, name: "Transporte", slug: "transporte" },
            {id:6, name: "Trabajo", slug: "trabajo" }],
            newoperation:[],
            filters:{
                kind: ["Todos", "gasto", "ganancia"],
                categories: [{ id:1 , name: "Comida", slug: "comida"}, {id:2,  name: "Servicios", slug: "servicios"},
                {id:3, name: "Salidas", slug: "salidas" },
                {id:4, name: "Educación", slug: "educación" }, {id:5, name: "Transporte", slug: "transporte" },
                {id:6, name: "Trabajo", slug: "trabajo" }],
                from: functionDate(),
                orderBy: ["Más reciente", "Menos reciente", "Mayor monto", "Menor monto", "A/Z", "Z/A"]
            } 
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
