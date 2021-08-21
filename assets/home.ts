//------------------VARIABLES---------------
const expense = document.querySelector('#expense');
const profit = document.querySelector('#profit');
let totalResult = document.querySelector('#total-result');

const opTable = document.querySelector('#op-table');
const noResultsCard = document.querySelector('#no-results-card');

const newOperationButton=document.getElementById('new-operation-button');

const table = document.getElementById('op-list');
const formEditOp = document.getElementById('form-edit-op');
const balanceFiltersSection = document.getElementById('balance-filters-section');
const opNewOp = document.getElementById('op-newOp');
const btnEditedOp= document.getElementById('btn-edited-op');
const opCard= document.getElementById('op-card');
const editedDescription= document.getElementById('edited-description');
const editedAmount= document.getElementById('edited-amount');
const editedKind= document.getElementById('edited-kind');
const editedCategory= document.getElementById('edited-category');
const editedDate= document.getElementById('edited-date');

const kindFilter = document.querySelector('#kind-filter');
const category =document.querySelector('#category');
const filterDate=document.querySelector('input[type="date"]');
filterDate.value= functionDate();
const orderFilter= document.querySelector('#order-filter');

const storage: LocalStorage = goOnStorage();
const myOperations= storage.newoperation

const filters = JSON.parse(localStorage.getItem('storage-filters'));

//--------- FILTERS: SELECT CATEGORY-------------------

loadFilterCategory();

//-----------BALANCE FUNCTION----------

const balanceFunction = (param = myOperations) =>{

    const storage: LocalStorage = goOnStorage();
    let resultProfit = 0;
    let resultExpense =0; 
    let total=0;

    for(const item of param){

        if( item.kind === "ganancia"){
            resultProfit= resultProfit + Number(item.amount); 
        } else if( item.kind === "gasto"){
            resultExpense= resultExpense - Number(item.amount); 
        }
    }

    total = resultProfit + resultExpense;
    profit.innerHTML = resultProfit;
    expense.innerHTML = -resultExpense;

    if(total<0){
        totalResult.innerHTML =`-$ ${-total}`;
        totalResult.setAttribute('class', 'negative-value')
        
    }else{
        totalResult.innerHTML = `$ ${total}`;
    }
};

balanceFunction ();

//---------HIDE NO RESULTS CARD------------

const hideCard = () =>{
    const storage: LocalStorage = goOnStorage();

    if(storage.newoperation.length == 0){

        opTable.classList.add('hidden');
        noResultsCard.classList.remove('hidden');

    }else {
        opTable.classList.remove('hidden');
        noResultsCard.classList.add('hidden');
    }
};

hideCard ();

//--------- NEW OPERATION BUTTON--------------------

const goToNewOp=(event)=>{
    window.location.href='./pages/new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);

//------------FILTERS FUNCTION-------------

let myCategory=[];

for ( const element of storage.categories){
    myCategory.push(element.slug);
};

const order= ["mas-reciente", "menos-reciente", "mayor-monto", "menor-monto", "a-z", "z-a"];

const filters = getFilterFromStorage();

const applyFilters = (event)=>{
    const newParam = event.target.value;
    console.log(newParam)
    if(newParam == "gasto" || newParam == "ganancia" || newParam == "todos"){
        filters.kind=newParam;
    } else if(myCategory.includes(newParam) || newParam == "todas"){
        filters.categories=newParam;
    } else if(order.includes(newParam)){
        filters.orderBy=newParam;
    }else{
        filters.from=newParam;
    };
    return filters;
};

let updateFilters;

const reChargeTable =(event)=>{
    updateFilters= applyFilters(event);
    updateTableOp(updateFilters);
};

//------------COMPLETE OP TABLE-------------

const updateTableOp = (filter=filters) => {

    let operations = storage.newoperation;

    let tempFilter = operations.filter( element =>  element.kind === filters.kind || filters.kind== "todos");

    tempFilter= tempFilter.filter(element => element.category === filters.categories || filters.categories== "todas");

    switch (filters.orderBy) {
        case 'mas-reciente': tempFilter= tempFilter.sort((a, b) => new Date(a.dateLine).getTime() - new Date(b.dateLine).getTime());
        break

        case 'menos-reciente':tempFilter= tempFilter.sort((a, b) => new Date(b.dateLine).getTime() - new Date(a.dateLine).getTime());
        break
        
        case 'mayor-monto': tempFilter= tempFilter.sort((b, a) => a.amount - b.amount);
        break

        case 'menor-monto':tempFilter= tempFilter.sort((b, a) => b.amount - a.amount);
        break

        case 'a-z':tempFilter= tempFilter.sort((a, b) => {if (a.description > b.description) {return 1
        }if (a.description < b.description) {
            return -1;
        }return 0;})
        
        break

        case 'z-a':tempFilter= tempFilter.sort((b, a) => {if (a.description > b.description) {return 1
        }if (a.description < b.description) {
            return -1;
        }return 0;})
        break

        default:
    };

    tempFilter=tempFilter.filter((operacion) => {
        const dateAdded = new Date(filters.from);
        const dateOperacion = new Date(operacion.dateLine)
        return dateOperacion.getTime() >= dateAdded.getTime()+1
    });

    table.innerHTML="";

    for(const element of tempFilter){

        const newRow= document.createElement('tr');
        const newRowDescription= document.createElement('td');
        const newRowCategory= document.createElement('td');
        const newRowDate= document.createElement('td');
        const newRowAmount= document.createElement('td');
        const newRowAction= document.createElement('td');

        const editAction =document.createElement('a');
        const deleteAction =document.createElement('button');
        
        editAction.setAttribute('value', element.description);
        editAction.setAttribute('class','action-class');
        deleteAction.setAttribute('class','action-class');

        newRowCategory.setAttribute('class','category-style');
        editAction.dataset.id = element.id;

        editAction.innerHTML="Editar";
        deleteAction.innerHTML="Eliminar";

        newRowAction.appendChild(editAction);
        newRowAction.appendChild(deleteAction);
        
        newRowDescription.innerHTML = element.description;
        newRowCategory.innerHTML = element.category;
        newRowDate.innerHTML = element.dateLine;
        
        if(element.kind === "gasto"){
            newRowAmount.setAttribute('class','negative-number');
            newRowAmount.innerHTML = "-" + element.amount;
        } else if(element.kind === "ganancia"){
            newRowAmount.setAttribute('class','positive-number');
            newRowAmount.innerHTML = "+" + element.amount;
        };

        newRow.appendChild(newRowDescription);
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowDate);
        newRow.appendChild(newRowAmount);
        newRow.appendChild(newRowAction);
        
        table.appendChild(newRow);

        const deleteOp = () => {
                
            const newArrayOp= storage.newoperation.filter(item => element.id !== item.id);
            storage.newoperation=newArrayOp;
            localStorage.setItem('full-storage', JSON.stringify(storage));

            balanceFunction();
            updateTableOp();
        };
    
        deleteAction.addEventListener('click', deleteOp);
        
        const goToEditOp = (e) => {

            editAction.dataset.id = element.id;
            const opToEdit= storage.newoperation.filter(item => element.id === item.id);

            localStorage.setItem('editedOp', JSON.stringify(opToEdit));

            const params= new URLSearchParams(window.location.search);
            editAction.setAttribute('href',`./edit-op.html?opId=${element.id}`)
        };
        editAction.addEventListener('click', goToEditOp);
    };
    hideCard ();
    balanceFunction(tempFilter);
};


const onloadPage =()=>{

    kindFilter.addEventListener('change', (event) => {
        reChargeTable(event);
        });
    category.addEventListener('change', (event) => {
        reChargeTable(event);
        });
    filterDate.addEventListener('change', (event) => {
        reChargeTable(event);
        });
    orderFilter.addEventListener('change', (event) => {
        reChargeTable(event);
        });
};

updateTableOp();
