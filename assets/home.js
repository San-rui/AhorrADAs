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
var btnEditedOp = document.getElementById('btn-edited-op');
var opCard = document.getElementById('op-card');
var editedDescription = document.getElementById('edited-description');
var editedAmount = document.getElementById('edited-amount');
var editedKind = document.getElementById('edited-kind');
var editedCategory = document.getElementById('edited-category');
var editedDate = document.getElementById('edited-date');
var updateTableOp = function () {
    var storage = goOnStorage();
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
    for (var _i = 0, _a = storage.newoperation; _i < _a.length; _i++) {
        var element = _a[_i];
        _loop_1(element);
    }
    ;
    hideCard();
};
updateTableOp();
