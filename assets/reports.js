//----------VARIABLES-----------------
var notEnoughOpCard = document.getElementById('not-enough-op-card');
var addCategoryContainer = document.getElementById('add-category-container');
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
var totalByMonthTable = document.getElementById('total-by-month-table');
//---------HIDE NOT ENOUGH CARD------------
var hideCardInsuficientOp = function () {
    var storage = goOnStorage();
    if (storage.newoperation.length >= 4) {
        notEnoughOpCard.classList.add('hidden');
        addCategoryContainer.classList.remove('hidden');
    }
    else {
        notEnoughOpCard.classList.remove('hidden');
        addCategoryContainer.classList.add('hidden');
    }
};
hideCardInsuficientOp();
//------------- SUMMARY----------------
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
    var dataChart = [];
    var total = [];
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
    ;
    for (var element in elementByCtegory) {
        elementByCtegory[element];
        var newRow = document.createElement('tr');
        var newRowCategory = document.createElement('td');
        var newRowProfit = document.createElement('td');
        var newRowExpense = document.createElement('td');
        var newRowBalance = document.createElement('td');
        newRowProfit.classList.add('text-center', 'width-table-column');
        newRowExpense.classList.add('text-center', 'width-table-column');
        newRowBalance.classList.add('text-end', 'width-table-column');
        newRowCategory.innerHTML = element;
        if (finalArrayCategories.positives[element] !== undefined) {
            newRowProfit.innerHTML = "+$ " + finalArrayCategories.positives[element];
            newRowProfit.classList.add('positive-number');
        }
        else {
            newRowProfit.innerHTML = "0";
        }
        if (finalArrayCategories.negatives[element] !== undefined) {
            newRowExpense.innerHTML = "-$ " + finalArrayCategories.negatives[element];
            newRowExpense.classList.add('negative-number');
        }
        else {
            newRowExpense.innerHTML = "0";
        }
        if (newRowProfit.innerHTML == "0") {
            newRowBalance.innerHTML = "-$ " + finalArrayCategories.negatives[element];
            newRowBalance.classList.add('negative-number');
            total.push(-Number(finalArrayCategories.negatives[element]));
        }
        else if (newRowExpense.innerHTML == "0") {
            newRowBalance.innerHTML = "+$ " + finalArrayCategories.positives[element];
            newRowBalance.classList.add('positive-number');
            total.push(Number(finalArrayCategories.positives[element]));
        }
        else {
            newRowBalance.innerHTML = Number(finalArrayCategories.positives[element]) - Number(finalArrayCategories.negatives[element]);
            total.push(Number(finalArrayCategories.positives[element]) - Number(finalArrayCategories.negatives[element]));
            if (Number(finalArrayCategories.positives[element]) > Number(finalArrayCategories.negatives[element])) {
                newRowBalance.classList.add('positive-number');
            }
            else if (Number(finalArrayCategories.positives[element]) < Number(finalArrayCategories.negatives[element])) {
                newRowBalance.classList.add('negative-number');
            }
        }
        ;
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        totalByCategoryTable.appendChild(newRow);
    }
    ;
    for (var prop in elementByCtegory) {
        dataChart.push(prop);
    }
    ;
    var myCategoriesChart = document.getElementById("my-categories-chart");
    var chart1 = new Chart(myCategoriesChart, {
        type: 'bar',
        data: {
            labels: dataChart,
            datasets: [{
                    label: 'Grafico de balance por categorias',
                    data: total,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 105, 86)',
                        'rgb(255, 199, 132)',
                        'rgb(54, 62, 235)',
                        'rgb(255, 5, 86)',
                        'rgb(205, 99, 132)',
                        'rgb(154, 162, 235)',
                        'rgb(25, 105, 86)',
                        'rgb(75, 199, 132)',
                        'rgb(149, 62, 235)',
                        'rgb(105, 5, 86)',
                    ]
                }]
        }, options: {
            scale: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        }
    });
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
var balanceByMonth = function () {
    var arrayMonth = [];
    var arrayBalancebyMonth = [];
    for (var prop in totalsByMonth) {
        var year = totalsByMonth[prop];
        totalsByMonth[year];
        for (var month in year) {
            var newRow = document.createElement('tr');
            var newRowMonth = document.createElement('td');
            var newRowProfit = document.createElement('td');
            var newRowExpense = document.createElement('td');
            var newRowBalance = document.createElement('td');
            newRowProfit.classList.add('text-center', 'width-table-column');
            newRowExpense.classList.add('text-center', 'width-table-column');
            newRowBalance.classList.add('text-end', 'width-table-column');
            newRowMonth.innerHTML = Number(month) + 1 + " /" + prop;
            arrayMonth.push(Number(month) + 1 + " /" + prop);
            if (year[month].ganancia !== undefined) {
                newRowProfit.innerHTML = "+$ " + year[month].ganancia;
                newRowProfit.classList.add('positive-number');
            }
            else {
                newRowProfit.innerHTML = "0";
            }
            if (year[month].gasto !== undefined) {
                newRowExpense.innerHTML = "-$ " + year[month].gasto;
                newRowExpense.classList.add('negative-number');
            }
            else {
                newRowExpense.innerHTML = "0";
            }
            if (newRowProfit.innerHTML == "0") {
                newRowBalance.innerHTML = "-$ " + Number(year[month].gasto);
                newRowBalance.classList.add('negative-number');
                arrayBalancebyMonth.push(-Number(year[month].gasto));
            }
            else if (newRowExpense.innerHTML == "0") {
                newRowBalance.innerHTML = newRowProfit.innerHTML;
                newRowBalance.classList.add('positive-number');
                arrayBalancebyMonth.push(Number(year[month].ganancia));
            }
            else {
                newRowBalance.innerHTML = "+$ " + (Number(year[month].ganancia) - Number(year[month].gasto));
                arrayBalancebyMonth.push(Number(year[month].ganancia) - Number(year[month].gasto));
                if (Number(year[month].ganancia) > Number(year[month].gasto)) {
                    newRowBalance.classList.add('positive-number');
                }
                else if (Number(year[month].ganancia) < Number(year[month].gasto)) {
                    newRowBalance.classList.add('negative-number');
                }
            }
            newRow.appendChild(newRowMonth);
            newRow.appendChild(newRowProfit);
            newRow.appendChild(newRowExpense);
            newRow.appendChild(newRowBalance);
            totalByMonthTable.appendChild(newRow);
        }
    }
    ;
    var myMonthChart = document.getElementById("my-month-chart");
    var chart1 = new Chart(myMonthChart, {
        type: 'bar',
        data: {
            labels: arrayMonth,
            datasets: [{
                    label: 'Grafico de balance por mes',
                    data: arrayBalancebyMonth,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 105, 86)',
                        'rgb(255, 199, 132)',
                        'rgb(54, 62, 235)',
                        'rgb(255, 5, 86)',
                        'rgb(205, 99, 132)',
                        'rgb(154, 162, 235)',
                        'rgb(25, 105, 86)',
                        'rgb(75, 199, 132)',
                        'rgb(149, 62, 235)',
                        'rgb(105, 5, 86)',
                    ]
                }]
        }, options: {
            scale: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        }
    });
};
balanceByMonth();
