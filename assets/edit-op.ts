
let storage: LocalStorage = goOnStorage();

const editedDescription= document.getElementById('edited-description');
const editedAmount= document.getElementById('edited-amount');
const editedKind= document.getElementById('edited-kind');
const editedCategory= document.getElementById('edited-category');
const editedDate= document.getElementById('edited-date');
const btnEditedOp= document.getElementById('btn-edited-op');
const btnCnlEditOp= document.getElementById('btn-cnl-edit-op');
let idOpToEdit=0;

//------------SHOW DATA EDIT OP-------------

const showOpDataToEdit=()=>{

    let opToEdit = JSON.parse(window.localStorage.getItem('editedOp'));
    
    for(const {id} of opToEdit){
    
        idOpToEdit = id;

        for(const element of storage.newoperation){
            
            if(element.id === idOpToEdit){
            
                editedDescription.value = element.description;
                editedAmount.value = element.amount;
                editedKind.value = element.kind;
                editedDate.value = element.dateLine;

                for(const category of storage.categories){

                    let itemCategory = document.createElement('option');
                    editedCategory.value= element.category;
                    itemCategory.innerHTML= category.name;
                    itemCategory.value = category.slug;
            
            
                    editedCategory.appendChild(itemCategory);
                };
            }
        }
    }
}
showOpDataToEdit();

//------------BUTTON EDIT OP-------------

const editedOp= () => {

    const newOpArray = storage.newoperation.map (item =>{
                
        if(item.id === idOpToEdit){
            return {...item, description: editedDescription.value, amount: editedAmount.value, kind: editedKind.value, dateLine: editedDate.value, category: editedCategory.value}
        } else{
            return item;
        }
    });

    storage.newoperation =  newOpArray;
    localStorage.setItem('full-storage', JSON.stringify(storage));

    window.location.href="./index.html"; 
}

btnEditedOp.addEventListener('click', editedOp);


//------------BUTTON CANCEL EDIT OP-------------

const goBackToOpTable= () => {

    window.location.href="./index.html"; 
}

btnCnlEditOp.addEventListener('click', goBackToOpTable);
