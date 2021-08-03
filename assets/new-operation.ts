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

let storage: LocalStorage = goOnStorage();
const newOperationForm = document.getElementById('form-new-op');

const createNewOp = (e) =>{
    e.preventDefault();

    const formNewOp = e.target;

    const newDescriptionName: string | number = formNewOp.description.value;
    const newAmountName:  number = formNewOp.amount.value;
    const newKindName: string  = formNewOp.kind.value;
    const newcategoryName: string = formNewOp.category.value;
    const newDateName: Date = formNewOp.date.value;

    
    const newOperationAdded: NewOp = {
        description: newDescriptionName,
        amount: newAmountName,
        kind: newKindName,
        category: newcategoryName,
        dateLine: newDateName,
    }

    storage.newoperation.push(newOperationAdded);

    localStorage.setItem('full-storage', JSON.stringify(storage));
    window.location.href='./index.html';

}
newOperationForm.addEventListener('submit', createNewOp);





