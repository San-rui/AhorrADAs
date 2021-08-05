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