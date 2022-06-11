let btnAccountsView = document.querySelector('#btn-accounts-view');
let tableMain = document.querySelector('#table-main');
let showAccountsView = document.querySelector('#accounts-view')
let addAccountsView = document.querySelector('#add-account');
let info = document.querySelector('.info')
let btnAddAccountsView = document.querySelector('#btn-add-acounts-view');
let btnSaveAccount = document.querySelector('#btn-save');
let btnEditDeleteShow = document.querySelector('#btn-edit-delete');
let tableMainEdit = document.querySelector('#edit-delete-table');
let tableMainEditTable = document.querySelector('#table-main-edit');
let btnEditSave = document.querySelector('#btn-edit-save');
let editedAccount = document.querySelector('.edited-account');
let acceptAllCookies = document.querySelector('#accept-cookies');
let acceptCookies = document.querySelector('.accept-cookies');
let body = document.querySelector('#body');

// INPUTS //

let addAccountId = document.querySelector('#add-account-id');
let addAccountName = document.querySelector('#add-account-name');
let addAccountDeposit = document.querySelector('#add-account-deposit');
let addAccountCard = document.querySelector('#add-account-card');

// INPUTS FOR EDITED ACCOUNT //
let eaddAccountId = document.querySelector('#eadd-account-id');
let eaddAccountName = document.querySelector('#eadd-account-name');
let eaddAccountDeposit = document.querySelector('#eadd-account-deposit');
let eaddAccountCard = document.querySelector('#eadd-account-card');


// THEME CHANGER 
let circle1 = document.querySelector('.circle1');
let circle2 = document.querySelector('.circle2');

let index = null;

createTable();


btnAccountsView.addEventListener('click',showAccounts);
btnAddAccountsView.addEventListener('click', showAddAccounts);
btnSaveAccount.addEventListener('click', saveAccountToAccounts);
btnEditDeleteShow.addEventListener('click', showEditDeleteAccounts);
btnEditSave.addEventListener('click', saveEditedAccount);
acceptAllCookies.addEventListener('click',acceptCookiesFunction);
window.addEventListener('beforeunload', refreshPageAndSave);
circle1.addEventListener('click',changeColorCircle1)
circle2.addEventListener('click',changeColorCircle2)



function changeColorCircle1(){
    body.style.backgroundColor = 'burlywood';
    localStorage.color1 = JSON.stringify(circle1);
}

function changeColorCircle2(){
    body.style.backgroundColor = 'darkblue';
}




// Data is saved in local storage
function acceptCookiesFunction(){
    acceptCookies.style.display = 'none';
    localStorage.db = JSON.stringify(db);
}


// When Page is Reloaded, Save DB
function refreshPageAndSave(){
    localStorage.db = JSON.stringify(db);
    localStorage.color1 = JSON.stringify(circle1);


}








function showAccounts(){
    showAccountsView.style.display = 'block';
    addAccountsView.style.display = 'none';
    tableMainEdit.style.display = 'none';
    editedAccount.style.display = 'none';


}

function showAddAccounts(){
    addAccountsView.style.display = 'block';
    showAccountsView.style.display = 'none';
    tableMainEdit.style.display = 'none';
    editedAccount.style.display = 'none';

}

function showEditDeleteAccounts(){
    showAccountsView.style.display = 'none';
    addAccountsView.style.display = 'none';
    tableMainEdit.style.display = 'block';
    editedAccount.style.display = 'none';

    createTableEdit();
}

function deleteAccount(){
    myIndex = this.getAttribute('data-index');
    db.splice(myIndex,1);
    localStorage.db = JSON.stringify(db);
    createTable();
    showAccounts();
}
function editAccount(){
    showAccountsView.style.display = 'none';
    addAccountsView.style.display = 'none';
    tableMainEdit.style.display = 'none';
    editedAccount.style.display = 'block';
    index = this.getAttribute('data-index')
    let currentAccount = db[index];
    eaddAccountId.value = currentAccount.id;
    eaddAccountName.value = currentAccount.name;
    eaddAccountDeposit.value = currentAccount.deposit;
    eaddAccountCard.value = currentAccount.cCard;

}

function saveEditedAccount(){
    let editedAccount = {
        id:eaddAccountId.value,
        name:eaddAccountName.value,
        deposit:eaddAccountDeposit.value,
        cCard:eaddAccountCard.value,
    };
    db[index] = editedAccount;
    // localStorage.db = JSON.stringify(db);
    createTable();
    showAccounts();
}



function saveAccountToAccounts(e){
    e.preventDefault();
    let addAccountIdVal = addAccountId.value;
    let addAccountNameVal = addAccountName.value;
    let addAccountDepositVal = addAccountDeposit.value;
    let addAccountCardVal = addAccountCard.value;
    let error = false;
    let errors = [];
    if(addAccountIdVal === ''){
        addAccountId.style.border = '1px solid red';
      errors.push('Potrebno je uneti ID izmedju 0 i 100');
    }
    if(addAccountNameVal < 5){
        addAccountName.style.border = '1px solid red';
        error = true;
        errors.push('Potrebno je uneti najmanje 5 karaktera za Name');
    }
    if(addAccountCardVal < 100){
      error = true;
      addAccountDeposit.style.border = '1px solid red';
      errors.push('Potrebno je depozitovati minimum 100 EUR')
    }
    if(addAccountCardVal != 'visa' && addAccountCardVal != 'mastercard'){
      error = true;
      addAccountCard.style.border = '1px solid red';
      errors.push('U polje card samo se priznaje Visa i MasterCard');
    }
    let dbNew = 
    {
        id: addAccountIdVal,
        name: addAccountNameVal,
        deposit: addAccountDepositVal,
        cCard: addAccountCardVal,
    };
    if(errors.length === 0){
        db.push(dbNew);
        // localStorage.db = JSON.stringify(db);
        createTable();
        showAccounts();
    }else{
        for (let i = 0; i < errors.length; i++) {
            
            info.innerHTML += '<p>'+errors[i]+'</p>'
        }
    }

}


function createTable(){
    let text = '';
    for (let i = 0; i < db.length; i++) {
        text += `
        <tr>
            <td>${db[i].id}</td>
            <td>${db[i].name}</td>
            <td>${db[i].deposit}</td>
            <td>${db[i].cCard}</td>
        </tr>`      
    }
    tableMain.innerHTML = text;
}
function createTableEdit(){
    let text = '';
    for (let i = 0; i < db.length; i++) {
        text += `
        <tr>
            <td>${db[i].id}</td>
            <td>${db[i].name}</td>
            <td>${db[i].deposit}</td>
            <td>${db[i].cCard}</td>
            <td><button class="btn btn-danger btns-delete" data-index="${i}">Delete</button><button class="btn btn-warning btns-edit" data-index="${i}">Edit</button></td>
        </tr>`      
    }
    tableMainEditTable.innerHTML = text;
    let btnsDelete = document.querySelectorAll('.btns-delete');
    let btnsEdit = document.querySelectorAll('.btns-edit');
        for (let i = 0; i < btnsDelete.length; i++) {
            btnsDelete[i].addEventListener('click', deleteAccount);
            btnsEdit[i].addEventListener('click',editAccount)    
        }



}


// SACUVAJ SVE U LOCAL STORAGE KADA SE REFRESUJE STRANICE NE PRE TOGA !
// KADA SE OTVORI STRANICA DA SE PRIHVATE KOLACICA DA SE PODACI CUVAJU, I KADA PRIHVATIS DA SE NE PONAVLJA VISE
// DA COVEK IZABERE TEMU STRANICE 