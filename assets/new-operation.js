var goOnStorage = function () {
    var fullLocalStorage = JSON.parse(localStorage.getItem('full-storage'));
    if (!fullLocalStorage) {
        fullLocalStorage = {
            newoperation: []
        };
    }
    return fullLocalStorage;
};
var storage = goOnStorage();
var newOperationForm = document.getElementById('form-new-op');
var createNewOp = function (e) {
    e.preventDefault();
    var formNewOp = e.target;
    var newDescriptionName = formNewOp.description.value;
    var newAmountName = formNewOp.amount.value;
    var newKindName = formNewOp.kind.value;
    var newcategoryName = formNewOp.category.value;
    var newDateName = formNewOp.date.value;
    var newOperationAdded = {
        description: newDescriptionName,
        amount: newAmountName,
        kind: newKindName,
        category: newcategoryName,
        dateLine: newDateName
    };
    storage.newoperation.push(newOperationAdded);
    localStorage.setItem('full-storage', JSON.stringify(storage));
    window.location.href = './index.html';
};
newOperationForm.addEventListener('submit', createNewOp);
