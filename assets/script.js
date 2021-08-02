//--------- NAV BAR BUTTONS--------------------
var balanceButton = document.querySelector('#balance');
var categoriesButton = document.querySelector('#categories');
var reportsButton = document.querySelector('#reports');
var goToPage = function (event) {
    var buttonClicked = event.target.value;
    console.log(buttonClicked);
    switch (buttonClicked) {
        case "balance":
            console.log('Balance');
            window.location.href = './index.html';
            break;
        case "categories":
            console.log('categories');
            window.location.href = './categories.html';
            break;
        case "reports":
            console.log('reports');
            window.location.href = './reports.html';
            break;
    }
    ;
};
balanceButton.addEventListener('click', goToPage);
categoriesButton.addEventListener('click', goToPage);
reportsButton.addEventListener('click', goToPage);
//--------- NEW OPERATION BUTTON--------------------
var newOperationButton = document.querySelector('#new-operation-button');
var goToNewOp = function (event) {
    window.location.href = './new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);
