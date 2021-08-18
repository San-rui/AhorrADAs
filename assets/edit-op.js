var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var storage = goOnStorage();
var editedDescription = document.getElementById('edited-description');
var editedAmount = document.getElementById('edited-amount');
var editedKind = document.getElementById('edited-kind');
var editedCategory = document.getElementById('edited-category');
var editedDate = document.getElementById('edited-date');
var btnEditedOp = document.getElementById('btn-edited-op');
var btnCnlEditOp = document.getElementById('btn-cnl-edit-op');
var idOpToEdit = 0;
//------------SHOW DATA EDIT OP-------------
var showOpDataToEdit = function () {
    var opToEdit = JSON.parse(window.localStorage.getItem('editedOp'));
    for (var _i = 0, opToEdit_1 = opToEdit; _i < opToEdit_1.length; _i++) {
        var id = opToEdit_1[_i].id;
        idOpToEdit = id;
        for (var _a = 0, _b = storage.newoperation; _a < _b.length; _a++) {
            var element = _b[_a];
            if (element.id === idOpToEdit) {
                editedDescription.value = element.description;
                editedAmount.value = element.amount;
                editedKind.value = element.kind;
                editedDate.value = element.dateLine;
                for (var _c = 0, _d = storage.categories; _c < _d.length; _c++) {
                    var category = _d[_c];
                    var itemCategory = document.createElement('option');
                    editedCategory.value = element.category;
                    itemCategory.innerHTML = category.name;
                    itemCategory.value = category.slug;
                    editedCategory.appendChild(itemCategory);
                }
                ;
            }
        }
    }
};
showOpDataToEdit();
//------------BUTTON EDIT OP-------------
var editedOp = function () {
    var newOpArray = storage.newoperation.map(function (item) {
        if (item.id === idOpToEdit) {
            return __assign(__assign({}, item), { description: editedDescription.value, amount: editedAmount.value, kind: editedKind.value, dateLine: editedDate.value, category: editedCategory.value });
        }
        else {
            return item;
        }
    });
    storage.newoperation = newOpArray;
    localStorage.setItem('full-storage', JSON.stringify(storage));
    window.location.href = "./index.html";
};
btnEditedOp.addEventListener('click', editedOp);
//------------BUTTON CANCEL EDIT OP-------------
var goBackToOpTable = function () {
    window.location.href = "./index.html";
};
btnCnlEditOp.addEventListener('click', goBackToOpTable);
