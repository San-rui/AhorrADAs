//---------VARIABLES--------------------------------
let storage: LocalStorage = goOnStorage();
const newOperationForm = document.getElementById('form-new-op');
const btnCnlOp = document.getElementById('btn-cnl-op');

//--------- FILTERS: SELECT CATEGORY-------------------

loadFilterCategory();

//--------- CREATE ID OPERATION-------------------

const getIdOp = () => {

    let storage: LocalStorage = goOnStorage();

    if(storage.newoperation.length > 0) {
    const lastItem = storage.newoperation[storage.newoperation.length -1];
    return lastItem.id + 1;
    } 

    return 1;
}


//--------- CREATE NEW OPERATION-------------------

const createNewOp = (e) =>{
    e.preventDefault();

    const formNewOp = e.target;

    const newDescriptionName: string | number = formNewOp.description.value;
    const newAmountName:  number = formNewOp.amount.value;
    const newKindName: string  = formNewOp.kind.value;
    const newcategoryName: string = formNewOp.category.value;
    const newDateName: Date = formNewOp.date.value;

    
    const newOperationAdded: NewOp = {
        id: getIdOp(),
        description: newDescriptionName,
        amount: newAmountName,
        kind: newKindName,
        category: newcategoryName,
        dateLine: newDateName,
    }

    storage.newoperation.push(newOperationAdded);

    localStorage.setItem('full-storage', JSON.stringify(storage));
    window.location.href='../index.html';

}
newOperationForm.addEventListener('submit', createNewOp);


const goBackToOpTableInfo= () => {

    window.location.href='../index.html'; 
}

btnCnlOp.addEventListener('click', goBackToOpTableInfo);




