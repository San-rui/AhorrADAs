//--------- FILTERS: SELECT CATEGORY-------------------

loadFilterCategory();

//-----------BALANCE FUNCTION----------
const expense = document.querySelector('#expense');
const profit = document.querySelector('#profit');
let totalResult = document.querySelector('#total-result');

const balanceFunction = () =>{

    const storage: LocalStorage = goOnStorage();

    let resultProfit = 0;
    let resultExpense =0; 

    let total=0;


    for(const item of storage.newoperation){

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

const opTable = document.querySelector('#op-table')

const noResultsCard = document.querySelector('#no-results-card')

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

const newOperationButton=document.getElementById('new-operation-button');

const goToNewOp=(event)=>{

    window.location.href='./pages/new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);

//------------Complete op table-------------
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


const filterExpense = document.querySelector('#filter-expense');
const filterProfit = document.querySelector('#filter-profit');
const kindFilter = document.querySelector('#kind-filter');

const storage: LocalStorage = goOnStorage();
const filters = storage.filters;




const filterOperations =(newoperation, filter)=>{

    console.log(newoperation);
    console.log("KINDS", filters.kind);
    console.log(filters.kind[1]);
    //console.log(filters.kind[filter]);

    const filterbyKind = (event)=>{
        event.preventDefault();
        const kindValue= event.target.value;

        console.log(kindValue);

        let newArrayKind=[]

        switch(kindValue){
            case "1": newArray3= newoperation.filter(item => "gasto" == item.kind);
    
        }
        console.log(newArrayKind)
        return newArrayKind
    }
    
    kindFilter.addEventListener('change', filterbyKind);

    //const newArrayFilterKind= newoperation.filter(item => filter == item.kind);

    //console.log("hola", newArrayFilterKind);

    

    return newoperation;

    
}

//kindFilter.addEventListener('change', filterOperations(storage.newoperation, "gasto"));
//filterProfit.addEventListener('click', filterOperations)



const updateTableOp = () => {

    const operations = filterOperations(storage.newoperation, filters) 

    table.innerHTML="";


    for(const element of operations){


        const newRow= document.createElement('tr');
        const newRowDescription= document.createElement('td');
        const newRowCategory= document.createElement('td');
        const newRowDate= document.createElement('td');
        const newRowAmount= document.createElement('td');
        const newRowAction= document.createElement('td');


        const editAction =document.createElement('button');
        const deleteAction =document.createElement('button');
        
        editAction.setAttribute('value', element.description);
        editAction.setAttribute('class','action-class');
        deleteAction.setAttribute('class','action-class');

        newRowCategory.setAttribute('class','category-style');
        editAction.dataset.id = element.id

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

            updateTableOp()
            balanceFunction();
        
        };
    
        deleteAction.addEventListener('click', deleteOp);
        
    };

    hideCard ();

};

updateTableOp()





