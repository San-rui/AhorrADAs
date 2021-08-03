//--------- NEW OPERATION BUTTON--------------------

const newOperationButton=document.getElementById('new-operation-button');

const goToNewOp=(event)=>{

    window.location.href='./new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);


