//--------- NAV BAR BUTTONS--------------------

const balanceButton=document.querySelector('#balance');
const categoriesButton= document.querySelector('#categories');
const reportsButton= document.querySelector('#reports');

const goToPage=(event)=>{
    const buttonClicked= event.target.value;
    console.log(buttonClicked);
    
    switch(buttonClicked){
        case "balance":
            console.log('Balance')
            window.location.href='./index.html';
        break

        case "categories":
            console.log('categories')
            window.location.href='./categories.html';
        break

        case "reports":
            console.log('reports')
            window.location.href='./reports.html';
        break
    };

};

balanceButton.addEventListener('click', goToPage);
categoriesButton.addEventListener('click', goToPage);
reportsButton.addEventListener('click', goToPage);


//--------- NEW OPERATION BUTTON--------------------

const newOperationButton=document.querySelector('#new-operation-button');

const goToNewOp=(event)=>{

    window.location.href='./new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);


