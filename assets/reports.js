//------------- SUMMARY----------------
var storage = goOnStorage();
var summaryCategoryProfit = document.querySelector('#summary-category-profit');
var summaryCategoryProfitAmount = document.querySelector('#summary-category-profit-amount');
var summaryCategoryExpense = document.querySelector('#summary-category-expense');
var summaryCategoryExpenseAmount = document.querySelector('#summary-category-expense-amount');
var categoryBalance = document.querySelector('#category-balance');
var categoryBalanceAmount = document.querySelector('#category-balance-amount');
var summaryMonthProfit = document.querySelector('#summary-month-profit');
var summaryMonthProfitAmount = document.querySelector('#summary-month-profit-amount');
var summaryMonthExpense = document.querySelector('#summary-month-expense');
var summaryMonthExpenseAmount = document.querySelector('#summary-month-expense-amount');
var HighestProfitOrExpenseCategory = function (storage, kind, categoryText, amountText) {
    var newArray = storage.newoperation.filter(function (element) { return element.kind == kind; });
    var elementByCategory = {};
    for (var _i = 0, newArray_1 = newArray; _i < newArray_1.length; _i++) {
        var item = newArray_1[_i];
        if (elementByCategory[item.category]) {
            elementByCategory[item.category] += Number(item.amount);
        }
        else {
            elementByCategory[item.category] = Number(item.amount);
        }
    }
    var result = {
        name: "",
        value: 0
    };
    for (var prop in elementByCategory) {
        if (elementByCategory[prop] > result.value) {
            result.value = elementByCategory[prop];
            result.name = prop;
        }
    }
    amountText.innerHTML = result.value;
    categoryText.innerHTML = result.name;
};
HighestProfitOrExpenseCategory(storage, "ganancia", summaryCategoryProfit, summaryCategoryProfitAmount);
HighestProfitOrExpenseCategory(storage, "gasto", summaryCategoryExpense, summaryCategoryExpenseAmount);
var HighestProfitOrExpenseMonth = function (storage, kind, dateLine, amount) {
    var newArray = storage.newoperation.filter(function (element) { return element.kind == kind; });
    var elementByMonth = {};
    for (var _i = 0, newArray_2 = newArray; _i < newArray_2.length; _i++) {
        var item = newArray_2[_i];
        if (elementByMonth[item.dateLine]) {
            elementByMonth[item.dateLine] += Number(item.amount);
        }
        else {
            elementByMonth[item.dateLine] = Number(item.amount);
        }
    }
    var result = {
        name: "",
        value: 0
    };
    for (var prop in elementByMonth) {
        if (elementByMonth[prop] > result.value) {
            result.value = elementByMonth[prop];
            result.name = prop;
        }
    }
    amount.innerHTML = result.value;
    dateLine.innerHTML = result.name;
};
HighestProfitOrExpenseMonth(storage, "ganancia", summaryMonthProfit, summaryMonthProfitAmount);
HighestProfitOrExpenseMonth(storage, "gasto", summaryMonthExpense, summaryMonthExpenseAmount);
var summaryBalance = function (storage, categoryText, amountText) {
    var newArray = storage.newoperation;
    var elementByCategory = {};
    for (var _i = 0, newArray_3 = newArray; _i < newArray_3.length; _i++) {
        var item = newArray_3[_i];
        if (elementByCategory[item.category]) {
            elementByCategory[item.category] += Number(item.amount);
        }
        else {
            elementByCategory[item.category] = Number(item.amount);
        }
    }
    var result = {
        name: "",
        value: 0
    };
    for (var prop in elementByCategory) {
        if (elementByCategory[prop] > result.value) {
            result.value = elementByCategory[prop];
            result.name = prop;
        }
    }
    categoryText.innerHTML = result.name;
    amountText.innerHTML = result.value;
};
summaryBalance(storage, categoryBalance, categoryBalanceAmount);
//-------------TOTAL BY CATEGORY-------------
var totalByCategoryTable = document.getElementById('total-by-category-table');
var storage = goOnStorage();
var getNewArrayCategories = function (storage, kind) {
    var newArray = storage.newoperation.filter(function (element) { return element.kind == kind; });
    var elementByCategory = {};
    for (var _i = 0, newArray_4 = newArray; _i < newArray_4.length; _i++) {
        var item = newArray_4[_i];
        if (elementByCategory[item.category]) {
            elementByCategory[item.category] += Number(item.amount);
        }
        else {
            elementByCategory[item.category] = Number(item.amount);
        }
    }
    return elementByCategory;
};
getNewArrayCategories(storage, "ganancia");
getNewArrayCategories(storage, "gasto");
var finalArrayCategories = {
    positives: getNewArrayCategories(storage, "ganancia"),
    negatives: getNewArrayCategories(storage, "gasto")
};
var balanceByCategory = function () {
    finalArrayCategories.positives;
    finalArrayCategories.negatives;
    var storage = goOnStorage();
    var newArray = storage.newoperation;
    var elementByCtegory = {};
    for (var _i = 0, newArray_5 = newArray; _i < newArray_5.length; _i++) {
        var item = newArray_5[_i];
        if (elementByCtegory[item.category]) {
            if (item.kind == "gasto") {
                elementByCtegory[item.category] -= Number(item.amount);
            }
            else {
                elementByCtegory[item.category] += Number(item.amount);
            }
            ;
        }
        else {
            elementByCtegory[item.category] = Number(item.amount);
        }
    }
    for (var element in elementByCtegory) {
        elementByCtegory[element];
        var newRow = document.createElement('tr');
        var newRowCategory = document.createElement('td');
        var newRowProfit = document.createElement('td');
        var newRowExpense = document.createElement('td');
        var newRowBalance = document.createElement('td');
        newRowCategory.innerHTML = element;
        newRowBalance.innerHTML = elementByCtegory[element];
        if (finalArrayCategories.positives[element] !== undefined) {
            newRowProfit.innerHTML = "+$ " + finalArrayCategories.positives[element];
        }
        else {
            newRowProfit.innerHTML = "0";
        }
        if (finalArrayCategories.negatives[element] !== undefined) {
            newRowExpense.innerHTML = "-$ " + finalArrayCategories.negatives[element];
        }
        else {
            newRowExpense.innerHTML = "0";
        }
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        totalByCategoryTable.appendChild(newRow);
    }
    ;
};
balanceByCategory();
//-------------TOTAL BY MONTH-------------
var totalsByMonth = {};
storage.newoperation.forEach(function (op) {
    var date = new Date(op.dateLine);
    if (!totalsByMonth[date.getFullYear()]) {
        totalsByMonth[date.getFullYear()] = {};
    }
    if (!totalsByMonth[date.getFullYear()][date.getMonth()]) {
        totalsByMonth[date.getFullYear()][date.getMonth()] = {};
    }
    if (!totalsByMonth[date.getFullYear()][date.getMonth()][op.kind]) {
        totalsByMonth[date.getFullYear()][date.getMonth()][op.kind] = 0;
    }
    totalsByMonth[date.getFullYear()][date.getMonth()][op.kind] += Number(op.amount);
});
console.log(totalsByMonth);
var totalByMonthTable = document.getElementById('total-by-month-table');
var balanceByMonth = function () {
    for (var prop in totalsByMonth) {
        console.log(prop);
        var year = totalsByMonth[prop];
        totalsByMonth[year];
        console.log(year);
        for (var month in year) {
            console.log(year[month].gasto);
            var newRow = document.createElement('tr');
            var newRowMonth = document.createElement('td');
            var newRowProfit = document.createElement('td');
            var newRowExpense = document.createElement('td');
            var newRowBalance = document.createElement('td');
            newRowMonth.innerHTML = " " + (Number(month) + 1) + " /" + prop;
            if (year[month].ganancia !== undefined) {
                newRowProfit.innerHTML = "+$ " + year[month].ganancia;
            }
            else {
                newRowProfit.innerHTML = "0";
            }
            if (year[month].gasto !== undefined) {
                newRowExpense.innerHTML = "-$ " + year[month].gasto;
            }
            else {
                newRowExpense.innerHTML = "0";
            }
            console.log(Number(newRowProfit.innerHTML));
            console.log(newRowExpense.innerHTML);
            if (newRowProfit.innerHTML == "0") {
                newRowBalance.innerHTML = "-$ " + Number(year[month].gasto);
            }
            else if (newRowExpense.innerHTML == "0") {
                newRowBalance.innerHTML = newRowProfit.innerHTML;
            }
            else {
                newRowBalance.innerHTML = Number(year[month].ganancia) - Number(year[month].gasto);
            }
            newRow.appendChild(newRowMonth);
            newRow.appendChild(newRowProfit);
            newRow.appendChild(newRowExpense);
            newRow.appendChild(newRowBalance);
            totalByMonthTable.appendChild(newRow);
        }
    }
    ;
};
balanceByMonth();
// const getNewArrayMonth =(storage, kind: string)=>{
//     let newArray= storage.newoperation.filter(element => element.kind == kind);
//     console.log(newArray);
//     for(const i=0; i< newArray.length; i++){
//         let oldFormatDate= newArray[i];
//         const toNewformatdate= oldFormatDate.dateLine
//         newArray[i].deteLineFinal= new Date(toNewformatdate).getMonth()+1;
//     }
//     console.log("jj", newArray);
//     for(const i=0; i< newArray.length; i++){
//         if(newArray[i].deteLineFinal===1 ){
//             newArray[i].deteLineFinal="Enero";
//         }else if(newArray[i].deteLineFinal===2 ){
//             newArray[i].deteLineFinal="Febrero";
//         }if(newArray[i].deteLineFinal===3 ){
//             newArray[i].deteLineFinal="Marzo";
//         }if(newArray[i].deteLineFinal===4 ){
//             newArray[i].deteLineFinal="Abril";
//         }if(newArray[i].deteLineFinal===5 ){
//             newArray[i].deteLineFinal="Mayo";
//         }if(newArray[i].deteLineFinal===6 ){
//             newArray[i].deteLineFinal="Junio";
//         }if(newArray[i].deteLineFinal===7 ){
//             newArray[i].deteLineFinal="Julio";
//         }if(newArray[i].deteLineFinal===8 ){
//             newArray[i].deteLineFinal="Agosto";
//         }if(newArray[i].deteLineFinal===9 ){
//             newArray[i].deteLineFinal="Septiembre";
//         }if(newArray[i].deteLineFinal===10 ){
//             newArray[i].deteLineFinal="Octubre";
//         }if(newArray[i].deteLineFinal===11 ){
//             newArray[i].deteLineFinal="Noviembre";
//         }else{
//             newArray[i].deteLineFinal="Diciembre";
//         }
//     }
//     const elementByMonth={};
//     for( const item of newArray){
//         if(elementByMonth[item.deteLineFinal]){
//             elementByMonth[item.deteLineFinal]+= Number(item.amount);
//         }else{
//             elementByMonth[item.deteLineFinal]= Number(item.amount);
//         }
//     }
//         console.log(elementByMonth)
//     return elementByMonth
// }
