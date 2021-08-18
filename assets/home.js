//--------- FILTERS: SELECT CATEGORY-------------------
loadFilterCategory();
//-----------BALANCE FUNCTION----------
var expense = document.querySelector('#expense');
var profit = document.querySelector('#profit');
var totalResult = document.querySelector('#total-result');
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
var opTable = document.querySelector('#op-table');
var noResultsCard = document.querySelector('#no-results-card');
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
var newOperationButton = document.getElementById('new-operation-button');
var goToNewOp = function (event) {
    window.location.href = './pages/new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);
//------------Complete op table-------------
var table = document.getElementById('op-list');
var formEditOp = document.getElementById('form-edit-op');
var balanceFiltersSection = document.getElementById('balance-filters-section');
var opNewOp = document.getElementById('op-newOp');
var opCard = document.getElementById('op-card');
var filterExpense = document.querySelector('#filter-expense');
var filterProfit = document.querySelector('#filter-profit');
var kindFilter = document.querySelector('#kind-filter');
var storage = goOnStorage();
var filters = storage.filters;
var filterOperations = function (newoperation, filter) {
    // console.log(newoperation);
    // console.log("KINDS", filters.kind);
    // console.log(filters.kind[1]);
    //console.log(filters.kind[filter]);
    var filterbyKind = function (event) {
        event.preventDefault();
        var kindValue = event.target.value;
        // console.log(kindValue);
        var newArrayKind = [];
        switch (kindValue) {
            case "1": newArray3 = newoperation.filter(function (item) { return "gasto" == item.kind; });
        }
        // console.log(newArrayKind)
        return newArrayKind;
    };
    kindFilter.addEventListener('change', filterbyKind);
    //const newArrayFilterKind= newoperation.filter(item => filter == item.kind);
    //console.log("hola", newArrayFilterKind);
    return newoperation;
};
//kindFilter.addEventListener('change', filterOperations(storage.newoperation, "gasto"));
//filterProfit.addEventListener('click', filterOperations)
var updateTableOp = function () {
    var operations = filterOperations(storage.newoperation, filters);
    table.innerHTML = "";
    var _loop_1 = function (element) {
        var newRow = document.createElement('tr');
        var newRowDescription = document.createElement('td');
        var newRowCategory = document.createElement('td');
        var newRowDate = document.createElement('td');
        var newRowAmount = document.createElement('td');
        var newRowAction = document.createElement('td');
        var editAction = document.createElement('a');
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
        var goToEditOp = function (e) {
            editAction.dataset.id = element.id;
            var opToEdit = storage.newoperation.filter(function (item) { return element.id === item.id; });
            localStorage.setItem('editedOp', JSON.stringify(opToEdit));
            var params = new URLSearchParams(window.location.search);
            editAction.setAttribute('href', "./edit-op.html?opId=" + element.id);
        };
        editAction.addEventListener('click', goToEditOp);
    };
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var element = operations_1[_i];
        _loop_1(element);
    }
    ;
};
hideCard();
;
updateTableOp();
