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



const storage: LocalStorage = goOnStorage();


const operationsFiltered = JSON.parse(localStorage.getItem('filteredOperations'));
//console.log("Este es mi array seteado en el LS", operationsFiltered);

const filters = JSON.parse(localStorage.getItem('storage-filters'));
console.log("Estos son mis filtros", filters);


//--------- FILTERS: SELECT CATEGORY-------------------

loadFilterCategory();


//-----------BALANCE FUNCTION----------

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

//------------FILTER TABLE-------------




let myCategory=[];

for ( const element of filters.categories){
    myCategory.push(element.slug);
};

console.log(myCategory)

let newArray=[];

const applyFilters = (event)=>{
    const newParam = event.target.value;
    console.log(newParam)

    
    if(filters.kind.includes(newParam)){
        if(newParam == "Todos"){
            newArray= operationsFiltered;
        }else{
            console.log('mi parametro es:', newParam);
            newArray= operationsFiltered.filter(item => newParam== item.kind);
        }
    } else if(myCategory.includes(newParam)){

        if(newParam == "todas"){
            console.log('mi parametro es todas:', newParam);
            newArray= operationsFiltered;
        }else{
            console.log('mi parametro es:', newParam);
            newArray= operationsFiltered.filter(item => newParam== item.category);
        }
        
    } else{  newArray=operationsFiltered.filter((operacion) => {
            const dateAdded = new Date(newParam);
            const dateOperacion = new Date(operacion.dateLine)
            return dateOperacion.getTime() >= dateAdded.getTime()+1
            })
    }

    console.log("este es mi nuevo array:", newArray)

    updateTableOp(newArray);

};

//------------COMPLETE OP TABLE-------------

const updateTableOp = (paramm=storage.newoperation) => {

    let operations = paramm;
    

    if(operations == []){
        localStorage.setItem('filteredOperations', JSON.stringify(storage.newoperation));

    }else{
        localStorage.setItem('filteredOperations', JSON.stringify(operations));
    }
    console.log("este en mi array filtrado", operations)

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


const onloadPage =()=>{

    kindFilter.addEventListener('change', (event) => {
        applyFilters(event);
        });
    category.addEventListener('change', (event) => {
        applyFilters(event);
        });
    filterDate.addEventListener('change', (event) => {
        applyFilters(event);
        });
};




// const filterbyKind = (event, newoperation)=>{
//     event.preventDefault();

//     const kindValue= event.target.value;
//     let newArrayKind=[];

//     if(kindValue==="todos"){
//         newArrayKind= newoperation;
//     }else{
//         let newArrayKind=[];
//     }

//     return newArrayKind
// };


// const filterbyCategory = (event, newoperation)=>{
//     event.preventDefault();

//     const catValue= event.target.value


//     let newArrayCategory=[];

//     if(catValue==="todas"){
//         newArrayCategory= newoperation;
//     }else{
//         newArrayCategory= newoperation.filter(item => catValue == item.category);
//     } 
    
//     return newArrayCategory;

// }

// const filterOperations =(newoperation)=>{

//     return newoperation;
// };

// let updateArray=[];

// const reChargeTable =(event)=>{
//     filterbyKind(event, operationsFiltered);
//     //filterbyCategory(event, operationsFiltered);
//     updateArray = filterbyKind(event, operationsFiltered);
//     //updateArray= filterbyCategory(event, operationsFiltered);

//     updateTableOp(updateArray);
// };