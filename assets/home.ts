//--------- FILTERS: SELECT CATEGORY-------------------

loadFilterCategory();

//--------- NEW OPERATION BUTTON--------------------

const newOperationButton=document.getElementById('new-operation-button');

const goToNewOp=(event)=>{

    window.location.href='./new-operation.html';
};
newOperationButton.addEventListener('click', goToNewOp);

//------------Complete op table-------------
const table = document.getElementById('op-list');

const updateTableOp = () => {

    const storage: LocalStorage = goOnStorage();
    console.log (storage);

    for(const element of storage.newoperation){
        console.log(element);

        const newRow= document.createElement('tr');
        const newRowDescription= document.createElement('td');
        const newRowCategory= document.createElement('td');
        const newRowDate= document.createElement('td');
        const newRowAmount= document.createElement('td');
        const newRowAction= document.createElement('td');

        const editAction =document.createElement('a');
        const deleteAction =document.createElement('a');
        
        editAction.setAttribute('href','https://www.youtube.com/');
        deleteAction.setAttribute('href','https://www.youtube.com/');
        editAction.setAttribute('class','action-class');
        deleteAction.setAttribute('class','action-class');

        newRowCategory.setAttribute('class','category-style');

        editAction.innerHTML="Editar";
        deleteAction.innerHTML="Eliminar";
        
        newRowAction.appendChild(editAction);
        newRowAction.appendChild(deleteAction);
        
        newRowDescription.innerHTML = element.description;
        newRowCategory.innerHTML = element.category;
        newRowDate.innerHTML = element.dateLine;
        
        if(element.kind === "gasto"){
            newRowAmount.setAttribute('class','negative-number');
            newRowAmount.innerHTML = "-" + element.amount;
        } else if(element.kind === "ganancia"){
            newRowAmount.setAttribute('class','positive-number');
            newRowAmount.innerHTML = "+" + element.amount;
        };

        newRow.appendChild(newRowDescription);
        newRow.appendChild(newRowCategory);
        newRow.appendChild(newRowDate);
        newRow.appendChild(newRowAmount);
        newRow.appendChild(newRowAction);
        
        table.appendChild(newRow);
    };
};

updateTableOp();