//---------VARIABLES--------------------------------
var storage = goOnStorage();
var newOperationForm = document.getElementById('form-new-op');
var btnCnlOp = document.getElementById('btn-cnl-op');
var OpDate = document.querySelector('input[type="date"]');
OpDate.value = functionDate();
//--------- FILTERS: SELECT CATEGORY-------------------
loadFilterCategory();
//--------- CREATE ID OPERATION-------------------
var getIdOp = function () {
    var storage = goOnStorage();
    if (storage.newoperation.length > 0) {
        var lastItem = storage.newoperation[storage.newoperation.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
//--------- CREATE NEW OPERATION-------------------
var createNewOp = function (e) {
    e.preventDefault();
    var formNewOp = e.target;
    var newDescriptionName = formNewOp.description.value;
    var newAmountName = formNewOp.amount.value;
    var newKindName = formNewOp.kind.value;
    var newcategoryName = formNewOp.category.value;
    var newDateName = formNewOp.date.value;
    var newOperationAdded = {
        id: getIdOp(),
        description: newDescriptionName,
        amount: newAmountName,
        kind: newKindName,
        category: newcategoryName,
        dateLine: newDateName
    };
    storage.newoperation.push(newOperationAdded);
    localStorage.setItem('full-storage', JSON.stringify(storage));
    window.location.href = '../index.html';
};
newOperationForm.addEventListener('submit', createNewOp);
var goBackToOpTableInfo = function () {
    window.location.href = '../index.html';
};
btnCnlOp.addEventListener('click', goBackToOpTableInfo);
