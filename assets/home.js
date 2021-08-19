//------------------VARIABLES---------------
var expense = document.querySelector('#expense');
var profit = document.querySelector('#profit');
var totalResult = document.querySelector('#total-result');
var opTable = document.querySelector('#op-table');
var noResultsCard = document.querySelector('#no-results-card');
var newOperationButton = document.getElementById('new-operation-button');
var table = document.getElementById('op-list');
var formEditOp = document.getElementById('form-edit-op');
var balanceFiltersSection = document.getElementById('balance-filters-section');
var opNewOp = document.getElementById('op-newOp');
var btnEditedOp = document.getElementById('btn-edited-op');
var opCard = document.getElementById('op-card');
var editedDescription = document.getElementById('edited-description');
var editedAmount = document.getElementById('edited-amount');
var editedKind = document.getElementById('edited-kind');
var editedCategory = document.getElementById('edited-category');
var editedDate = document.getElementById('edited-date');
var kindFilter = document.querySelector('#kind-filter');
var category = document.querySelector('#category');
var filterDate = document.querySelector('input[type="date"]');
filterDate.value = functionDate();
var storage = goOnStorage();
var operationsFiltered = JSON.parse(localStorage.getItem('filteredOperations'));
//console.log("Este es mi array seteado en el LS", operationsFiltered);
var filters = JSON.parse(localStorage.getItem('storage-filters'));
console.log("Estos son mis filtros", filters);
//--------- FILTERS: SELECT CATEGORY-------------------
loadFilterCategory();
//-----------BALANCE FUNCTION----------
var balanceFunction = function () {
    var storage = goOnStorage();
    var resultProfit = 0;
    var resultExpense = 0;
    var total = 0;
    for (var _i = 0, _a = storage.newoperation; _i < _a.length; _i++) {
        var item = _a[_i];
        if (item.kind === "ganancia") {
            resultProfit = resultProfit + Number(item.amount);
        }
        else if (item.kind === "gasto") {
            resultExpense = resultExpense - Number(item.amount);
        }
    }
    total = resultProfit + resultExpense;
    profit.innerHTML = resultProfit;
    expense.innerHTML = -resultExpense;
    if (total < 0) {
        totalResult.innerHTML = "-$ " + -total;
        totalResult.setAttribute('class', 'negative-value');
    }
    else {
        totalResult.innerHTML = "$ " + total;
    }
};
balanceFunction();
//---------HIDE NO RESULTS CARD------------
var hideCard = function () {
    var storage = goOnStorage();
    if (storage.newoperation.length == 0) {
        opTable.classList.add('hidden');
        noResultsCard.classList.remove('hidden');
    }
    else {
        opTable.classList.remove('hidden');
        noResultsCard.classList.add('hidden');
    }
};
hideCard();
//--------- NEW OPERATION BUTTON--------------------
var goToNewOp = function (event) {
    window.location.href = './pages/new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);
//------------FILTER TABLE-------------
var myCategory = [];
for (var _i = 0, _a = filters.categories; _i < _a.length; _i++) {
    var element = _a[_i];
    myCategory.push(element.slug);
}
;
console.log(myCategory);
var newArray = [];
var applyFilters = function (event) {
    var newParam = event.target.value;
    console.log(newParam);
    if (filters.kind.includes(newParam)) {
        if (newParam == "Todos") {
            newArray = operationsFiltered;
        }
        else {
            console.log('mi parametro es:', newParam);
            newArray = operationsFiltered.filter(function (item) { return newParam == item.kind; });
        }
    }
    else if (myCategory.includes(newParam)) {
        if (newParam == "todas") {
            console.log('mi parametro es todas:', newParam);
            newArray = operationsFiltered;
        }
        else {
            console.log('mi parametro es:', newParam);
            newArray = operationsFiltered.filter(function (item) { return newParam == item.category; });
        }
    }
    else {
        newArray = operationsFiltered.filter(function (operacion) {
            var dateAdded = new Date(newParam);
            var dateOperacion = new Date(operacion.dateLine);
            return dateOperacion.getTime() >= dateAdded.getTime() + 1;
        });
    }
    console.log("este es mi nuevo array:", newArray);
    updateTableOp(newArray);
};
//------------COMPLETE OP TABLE-------------
var updateTableOp = function (paramm) {
    if (paramm === void 0) { paramm = storage.newoperation; }
    var operations = paramm;
    if (operations == []) {
        localStorage.setItem('filteredOperations', JSON.stringify(storage.newoperation));
    }
    else {
        localStorage.setItem('filteredOperations', JSON.stringify(operations));
    }
    console.log("este en mi array filtrado", operations);
    table.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newRowDescription = document.createElement('td');
        var newRowCategory = document.createElement('td');
        var newRowDate = document.createElement('td');
        var newRowAmount = document.createElement('td');
        var newRowAction = document.createElement('td');
        var editAction = document.createElement('button');
        var deleteAction = document.createElement('button');
        editAction.setAttribute('value', element.description);
        editAction.setAttribute('class', 'action-class');
        deleteAction.setAttribute('class', 'action-class');
        newRowCategory.setAttribute('class', 'category-style');
        editAction.dataset.id = element.id;
        editAction.innerHTML = "Editar";
        deleteAction.innerHTML = "Eliminar";
        newRowAction.appendChild(editAction);
        newRowAction.appendChild(deleteAction);
        newRowDescription.innerHTML = element.description;
        newRowCategory.innerHTML = element.category;
        newRowDate.innerHTML = element.dateLine;
        if (element.kind === "gasto") {
            newRowAmount.setAttribute('class', 'negative-number');
            newRowAmount.innerHTML = "-" + element.amount;
        }
        else if (element.kind === "ganancia") {
            newRowAmount.setAttribute('class', 'positive-number');
            newRowAmount.innerHTML = "+" + element.amount;
        }
        ;
        newRow.appendChild(newRowDescription);
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowDate);
        newRow.appendChild(newRowAmount);
        newRow.appendChild(newRowAction);
        table.appendChild(newRow);
        var deleteOp = function () {
            var newArrayOp = storage.newoperation.filter(function (item) { return element.id !== item.id; });
            storage.newoperation = newArrayOp;
            localStorage.setItem('full-storage', JSON.stringify(storage));
            updateTableOp();
            balanceFunction();
        };
        deleteAction.addEventListener('click', deleteOp);
    };
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var element = operations_1[_i];
        _loop_1(element);
    }
    ;
    hideCard();
};
updateTableOp();
var onloadPage = function () {
    kindFilter.addEventListener('change', function (event) {
        applyFilters(event);
    });
    category.addEventListener('change', function (event) {
        applyFilters(event);
    });
    filterDate.addEventListener('change', function (event) {
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
