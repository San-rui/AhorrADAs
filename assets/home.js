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
var orderFilter = document.querySelector('#order-filter');
var storage = goOnStorage();
var operationsFiltered = JSON.parse(localStorage.getItem('filteredOperations'));
var filters = JSON.parse(localStorage.getItem('storage-filters'));
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
//------------FILTERS FUNCTION-------------
var myCategory = [];
for (var _i = 0, _a = filters.categories; _i < _a.length; _i++) {
    var element = _a[_i];
    myCategory.push(element.slug);
}
;
var newArray = [];
var applyFilters = function (event) {
    var newParam = event.target.value;
    console.log(newParam);
    if (filters.kind.includes(newParam)) {
        if (newParam == "Todos") {
            newArray = operationsFiltered;
        }
        else {
            newArray = operationsFiltered.filter(function (item) { return newParam == item.kind; });
        }
    }
    else if (myCategory.includes(newParam)) {
        if (newParam == "todas") {
            newArray = operationsFiltered;
        }
        else {
            newArray = operationsFiltered.filter(function (item) { return newParam == item.category; });
        }
    }
    else if (filters.orderBy.includes(newParam)) {
        switch (newParam) {
            case 'mas-reciente':
                newArray = operationsFiltered.sort(function (a, b) { return new Date(a.dateLine).getTime() - new Date(b.dateLine).getTime(); });
                break;
            case 'menos-reciente':
                newArray = operationsFiltered.sort(function (a, b) { return new Date(b.dateLine).getTime() - new Date(a.dateLine).getTime(); });
                break;
            case 'mayor-monto':
                newArray = operationsFiltered.sort(function (b, a) { return a.amount - b.amount; });
                break;
            case 'menor-monto':
                newArray = operationsFiltered.sort(function (b, a) { return b.amount - a.amount; });
                break;
            case 'a-z':
                newArray = operationsFiltered.sort(function (a, b) {
                    if (a.description > b.description) {
                        return 1;
                    }
                    if (a.description < b.description) {
                        return -1;
                    }
                    return 0;
                });
                break;
            case 'z-a':
                newArray = operationsFiltered.sort(function (b, a) {
                    if (a.description > b.description) {
                        return 1;
                    }
                    if (a.description < b.description) {
                        return -1;
                    }
                    return 0;
                });
                break;
            default:
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
    console.log("que entra aca", operations);
    if (operations == []) {
        localStorage.setItem('filteredOperations', JSON.stringify(storage.newoperation));
    }
    else {
        localStorage.setItem('filteredOperations', JSON.stringify(storage.newoperation));
        console.log("este en mi array filtrado", operations);
    }
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
    hideCard();
    balanceFunction();
};
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
    orderFilter.addEventListener('change', function (event) {
        applyFilters(event);
    });
};
updateTableOp();
