
//---------HIDE NOT ENOUGH CARD------------
const notEnoughOpCard = document.getElementById('not-enough-op-card');
const addCategoryContainer =document.getElementById('add-category-container');
let storage: LocalStorage = goOnStorage();

const hideCardInsuficientOp = () =>{

    const storage: LocalStorage = goOnStorage();

    if(storage.newoperation.length >= 4){

        notEnoughOpCard.classList.add('hidden');
        addCategoryContainer.classList.remove('hidden');

    }else{
        notEnoughOpCard.classList.remove('hidden');
        addCategoryContainer.classList.add('hidden');
    }
};
hideCardInsuficientOp();

//------------- SUMMARY----------------
let storage: LocalStorage = goOnStorage();

const summaryCategoryProfit = document.querySelector('#summary-category-profit');
const summaryCategoryProfitAmount = document.querySelector('#summary-category-profit-amount');
const summaryCategoryExpense = document.querySelector('#summary-category-expense');
const summaryCategoryExpenseAmount = document.querySelector('#summary-category-expense-amount');
const categoryBalance = document.querySelector('#category-balance');
const categoryBalanceAmount = document.querySelector('#category-balance-amount');
const summaryMonthProfit= document.querySelector('#summary-month-profit');
const summaryMonthProfitAmount = document.querySelector('#summary-month-profit-amount');
const summaryMonthExpense= document.querySelector('#summary-month-expense');
const summaryMonthExpenseAmount = document.querySelector('#summary-month-expense-amount');
const totalByMonthTable = document.getElementById('total-by-month-table');


const HighestProfitOrExpenseCategory = (storage, kind: string, categoryText, amountText) =>{
    
    let newArray= storage.newoperation.filter(element => element.kind == kind);

    const elementByCategory={};
    for( const item of newArray){
        if(elementByCategory[item.category]){
            elementByCategory[item.category]+= Number(item.amount);

        }else{
            elementByCategory[item.category]= Number(item.amount);
        }
    }

    const result={
        name:"",
        value:0,
    };

    for( const prop in elementByCategory){
        if(elementByCategory[prop]>result.value){
            result.value=elementByCategory[prop];
            result.name= prop;
        }
    }
    amountText.innerHTML= result.value;
    categoryText.innerHTML= result.name;

};

HighestProfitOrExpenseCategory (storage, "ganancia", summaryCategoryProfit, summaryCategoryProfitAmount);
HighestProfitOrExpenseCategory (storage, "gasto", summaryCategoryExpense, summaryCategoryExpenseAmount);


const HighestProfitOrExpenseMonth = (storage, kind: string, dateLine: Date, amount) =>{

    let newArray= storage.newoperation.filter(element => element.kind == kind);

    const elementByMonth={};
    for( const item of newArray){
        if(elementByMonth[item.dateLine]){
            elementByMonth[item.dateLine]+= Number(item.amount);

        }else{
            elementByMonth[item.dateLine]= Number(item.amount);
        }
    }

    const result={
        name:"",
        value:0,
    };

    for( const prop in elementByMonth){
        if(elementByMonth[prop]>result.value){
            result.value=elementByMonth[prop];
            result.name= prop;
        }
    }
    amount.innerHTML= result.value;
    dateLine.innerHTML= result.name;
};

HighestProfitOrExpenseMonth (storage, "ganancia", summaryMonthProfit, summaryMonthProfitAmount);
HighestProfitOrExpenseMonth (storage, "gasto", summaryMonthExpense, summaryMonthExpenseAmount);

const summaryBalance = (storage, categoryText, amountText) =>{

    let newArray= storage.newoperation

    const elementByCategory={};
    for( const item of newArray){
        if(elementByCategory[item.category]){
            elementByCategory[item.category]+= Number(item.amount);

        }else{
            elementByCategory[item.category]= Number(item.amount);
        }
    }
    const result={
        name:"",
        value:0,
    };

    for( const prop in elementByCategory){
        if(elementByCategory[prop]>result.value){
            result.value=elementByCategory[prop];
            result.name= prop;
        }
        
    }
    categoryText.innerHTML= result.name;
    amountText.innerHTML= result.value;
};

summaryBalance  (storage, categoryBalance, categoryBalanceAmount);

//-------------TOTAL BY CATEGORY-------------

const totalByCategoryTable = document.getElementById('total-by-category-table');
const storage: LocalStorage = goOnStorage();

const getNewArrayCategories =(storage, kind: string)=>{
    
    let newArray= storage.newoperation.filter(element => element.kind == kind);

    

    const elementByCategory={};
    for( const item of newArray){
        if(elementByCategory[item.category]){
            elementByCategory[item.category]+= Number(item.amount);

        }else{
            elementByCategory[item.category]= Number(item.amount);
        }
    }
    return elementByCategory
}

getNewArrayCategories(storage, "ganancia");
getNewArrayCategories(storage, "gasto");

const finalArrayCategories={
    positives: getNewArrayCategories(storage, "ganancia"),
    negatives: getNewArrayCategories(storage, "gasto")
};


const balanceByCategory= () => {

    finalArrayCategories.positives;
    finalArrayCategories.negatives;
    let dataChart=[];
    let total=[];

    const storage: LocalStorage = goOnStorage();
    let newArray= storage.newoperation

    const elementByCtegory={};
    for( const item of newArray){
        if(elementByCtegory[item.category]){
            if(item.kind == "gasto"){
                elementByCtegory[item.category]-= Number(item.amount);
            }else{
                elementByCtegory[item.category]+= Number(item.amount);
            };
            
        }else{
            elementByCtegory[item.category]= Number(item.amount);
        }
    };
    
    for(const element in elementByCtegory){

        elementByCtegory[element];

        const newRow= document.createElement('tr');
        const newRowCategory= document.createElement('td');
        const newRowProfit= document.createElement('td');
        const newRowExpense= document.createElement('td');
        const newRowBalance= document.createElement('td');
        
        newRowProfit.classList.add('text-center', 'width-table-column');
        newRowExpense.classList.add('text-center', 'width-table-column');
        newRowBalance.classList.add('text-end', 'width-table-column');

        newRowCategory.innerHTML = element;

        if( finalArrayCategories.positives[element]!== undefined){
            newRowProfit.innerHTML = `+$ ${finalArrayCategories.positives[element]}`;
            newRowProfit.classList.add('positive-value') ;

        }else {
            newRowProfit.innerHTML = "0";
        }
        if(finalArrayCategories.negatives[element]!== undefined){
            newRowExpense.innerHTML = `-$ ${finalArrayCategories.negatives[element]}`;
            newRowExpense.classList.add('negative-value');

        }else {
            newRowExpense.innerHTML = "0";
        }

        if(newRowProfit.innerHTML == "0"){
            newRowBalance.innerHTML = `-$ ${finalArrayCategories.negatives[element]}`;
            newRowBalance.classList.add('negative-value');
            total.push(-Number(finalArrayCategories.negatives[element]));

        } else if(newRowExpense.innerHTML == "0"){
            newRowBalance.innerHTML = `+$ ${finalArrayCategories.positives[element]}`;
            newRowBalance.classList.add('positive-value');
            total.push(Number(finalArrayCategories.positives[element]));

        }else{
            newRowBalance.innerHTML =  Number(finalArrayCategories.positives[element]) -  Number(finalArrayCategories.negatives[element]);
            total.push(Number(finalArrayCategories.positives[element]) -  Number(finalArrayCategories.negatives[element]))
            if(Number(finalArrayCategories.positives[element])>Number(finalArrayCategories.negatives[element])){
                newRowBalance.classList.add('positive-value');
            }else if(Number(finalArrayCategories.positives[element])<Number(finalArrayCategories.negatives[element])){
                newRowBalance.classList.add('negative-value');
            }
        };
        
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        totalByCategoryTable.appendChild(newRow);
    };

    for(const prop in elementByCtegory){
        dataChart.push(prop)
    };


    const myCategoriesChart = document.getElementById("my-categories-chart");
    let chart1= new Chart(myCategoriesChart, {
    type:'bar',
    data: {
        labels: dataChart,
        datasets: [ { 
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
            ],
        }]
    }, options: {
        scale: {
            yAxes:[{
                ticks: { 
                    beginAtZero: true
                }
            }]
        }
    }
    })

};

balanceByCategory();

//-------------TOTAL BY MONTH-------------

let totalsByMonth = {};

storage.newoperation.forEach((op) =>{
    const date = new Date(op.dateLine);
    
    if(!totalsByMonth[date.getFullYear()]){
        totalsByMonth[date.getFullYear()] ={};
    }
    if(!totalsByMonth[date.getFullYear()][date.getMonth()]){
        totalsByMonth[date.getFullYear()][date.getMonth()] = {};
    }
    if(!totalsByMonth[date.getFullYear()][date.getMonth()][op.kind]){
        totalsByMonth[date.getFullYear()][date.getMonth()][op.kind] = 0;
    }

    totalsByMonth[date.getFullYear()][date.getMonth()][op.kind] += Number(op.amount);

});

const balanceByMonth= () => {

    let arrayMonth=[];
    let arrayBalancebyMonth=[];

    for(const prop in totalsByMonth){

        const year = totalsByMonth[prop]
        totalsByMonth[year];

        for ( const month in year){

        const newRow= document.createElement('tr');
        const newRowMonth= document.createElement('td');
        const newRowProfit= document.createElement('td');
        const newRowExpense= document.createElement('td');
        const newRowBalance= document.createElement('td');

        newRowProfit.classList.add('text-center', 'width-table-column');
        newRowExpense.classList.add('text-center', 'width-table-column');
        newRowBalance.classList.add('text-end', 'width-table-column');

        newRowMonth.innerHTML = `${Number(month)+1} /${prop}`;
        arrayMonth.push(`${Number(month)+1} /${prop}`);


        if( year[month].ganancia!== undefined){
            newRowProfit.innerHTML = `+$ ${year[month].ganancia}`;
            newRowProfit.classList.add('positive-value');
        }else {
            newRowProfit.innerHTML = "0";
        }
        if(year[month].gasto!== undefined){
            newRowExpense.innerHTML = `-$ ${year[month].gasto}`;
            newRowExpense.classList.add('negative-value');
        }else {
            newRowExpense.innerHTML = "0";
        }

        if(newRowProfit.innerHTML == "0"){
            newRowBalance.innerHTML = `-$ ${Number(year[month].gasto)}`;
            newRowBalance.classList.add('negative-value');
            arrayBalancebyMonth.push(-Number(year[month].gasto));

        } else if(newRowExpense.innerHTML == "0"){
            newRowBalance.innerHTML = newRowProfit.innerHTML ;
            newRowBalance.classList.add('positive-value');
            arrayBalancebyMonth.push(Number(year[month].ganancia));

        }else{
            newRowBalance.innerHTML =  `+$ ${Number(year[month].ganancia) -  Number(year[month].gasto)}`;
            arrayBalancebyMonth.push(Number(year[month].ganancia) -  Number(year[month].gasto));

            if(Number(year[month].ganancia)>Number(year[month].gasto)){
                newRowBalance.classList.add('positive-value');
            }else if(Number(year[month].ganancia)<Number(year[month].gasto)){
                newRowBalance.classList.add('negative-value');
            }
        }
    
        newRow.appendChild(newRowMonth);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        
        totalByMonthTable.appendChild(newRow);

        }
    };

    const myMonthChart = document.getElementById("my-month-chart");
    let chart1= new Chart(myMonthChart, {
    type:'bar',
    data: {
        labels: arrayMonth,
        datasets: [ { 
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
            ],
        }]
    }, options: {
        scale: {
            yAxes:[{
                ticks: { 
                    beginAtZero: true
                }
            }]
        }
    }
    })
};

balanceByMonth();





