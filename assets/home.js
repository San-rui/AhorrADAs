//--------- FILTERS: SELECT CATEGORY-------------------
loadFilterCategory();
//--------- NEW OPERATION BUTTON--------------------
var newOperationButton = document.getElementById('new-operation-button');
var goToNewOp = function (event) {
    window.location.href = './new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);
//------------Complete op table-------------
var table = document.getElementById('op-list');
var updateTableOp = function () {
    var storage = goOnStorage();
    console.log(storage);
    for (var _i = 0, _a = storage.newoperation; _i < _a.length; _i++) {
        var element = _a[_i];
        console.log(element);
        var newRow = document.createElement('tr');
        var newRowDescription = document.createElement('td');
        var newRowCategory = document.createElement('td');
        var newRowDate = document.createElement('td');
        var newRowAmount = document.createElement('td');
        var newRowAction = document.createElement('td');
        var editAction = document.createElement('a');
        var deleteAction = document.createElement('a');
        editAction.setAttribute('href', 'https://www.youtube.com/');
        deleteAction.setAttribute('href', 'https://www.youtube.com/');
        editAction.setAttribute('class', 'action-class');
        deleteAction.setAttribute('class', 'action-class');
        newRowCategory.setAttribute('class', 'category-style');
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
    }
    ;
};
updateTableOp();
