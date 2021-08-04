type NewOp = {
    description?: string | number,
    amount: number,
    kind: string,
    category: string,
    dateLine: Date,
};

type LocalStorage = {
    newoperation: NewOp[],
};

const goOnStorage = (): LocalStorage =>{
    let fullLocalStorage : LocalStorage = JSON.parse(localStorage.getItem('full-storage'));

    if(!fullLocalStorage) {
        fullLocalStorage = {
            newoperation:[]
        } 
    }

    return fullLocalStorage;
};