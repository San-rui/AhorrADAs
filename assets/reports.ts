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
    }
    
    for(const element in elementByCtegory){

        elementByCtegory[element];

        const newRow= document.createElement('tr');
        const newRowCategory= document.createElement('td');
        const newRowProfit= document.createElement('td');
        const newRowExpense= document.createElement('td');
        const newRowBalance= document.createElement('td');

        newRowCategory.innerHTML = element;
        newRowBalance.innerHTML = elementByCtegory[element];

        if( finalArrayCategories.positives[element]!== undefined){
            newRowProfit.innerHTML = `+$ ${finalArrayCategories.positives[element]}`;
        }else {
            newRowProfit.innerHTML = "0";
        }
        if(finalArrayCategories.negatives[element]!== undefined){
            newRowExpense.innerHTML = `-$ ${finalArrayCategories.negatives[element]}`;
        }else {
            newRowExpense.innerHTML = "0";
        }
        
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        
        totalByCategoryTable.appendChild(newRow);
    };
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

console.log(totalsByMonth)


const totalByMonthTable = document.getElementById('total-by-month-table');


const balanceByMonth= () => {


    for(const prop in totalsByMonth){

        console.log(prop)

        const year = totalsByMonth[prop]
        totalsByMonth[year];

        console.log(year)

        for ( const month in year){
            console.log(year[month].gasto);


            const newRow= document.createElement('tr');
        const newRowMonth= document.createElement('td');
        const newRowProfit= document.createElement('td');
        const newRowExpense= document.createElement('td');
        const newRowBalance= document.createElement('td');

        newRowMonth.innerHTML = ` ${Number(month)+1} /${prop}`;


        if( year[month].ganancia!== undefined){
            newRowProfit.innerHTML = `+$ ${year[month].ganancia}`;
        }else {
            newRowProfit.innerHTML = "0";
        }
        if(year[month].gasto!== undefined){
            newRowExpense.innerHTML = `-$ ${year[month].gasto}`;
        }else {
            newRowExpense.innerHTML = "0";
        }
        
        console.log(Number(newRowProfit.innerHTML));
        console.log(newRowExpense.innerHTML);


        if(newRowProfit.innerHTML == "0"){
            newRowBalance.innerHTML = `-$ ${Number(year[month].gasto)}`;
        } else if(newRowExpense.innerHTML == "0"){
            newRowBalance.innerHTML = newRowProfit.innerHTML ;
        }else{
            newRowBalance.innerHTML =  Number(year[month].ganancia) -  Number(year[month].gasto)
        }
    

        newRow.appendChild(newRowMonth);
        newRow.appendChild(newRowProfit);
        newRow.appendChild(newRowExpense);
        newRow.appendChild(newRowBalance);
        
        totalByMonthTable.appendChild(newRow);

        }
        

        

        
    };
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