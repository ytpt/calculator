let action, a, b;
clear();

function calc(action, a, b) {
    console.log(action, a, b);
    if (a === undefined || b === undefined || a === null || b === null){
        return 'Error';
    }
    
    switch(action) {
        case '+':
            return parseFloat(a) + parseFloat(b);
            break;
        case '-':
            return a - b;
            break;
        case '×':
            return a * b;
            break;
        case '÷':
            return a / b;
            break;
        default:
            return 'Error';
    }
}

// "C"
function clear(){
    document.getElementById('screen').innerHTML = '0';
    action = null;
    a = 0;
    b = null;
}
document.getElementById("btnC").addEventListener("click", clear);

// numbers
function setNumber(){
    let screenElement = document.getElementById('screen');
    let screenContent = screenElement.innerHTML;
    if (screenContent === '0'){
        screenContent = '';
    }

    let value = this.innerHTML;
    if (action === null){
        if (a === '0'){
            a = value;
        } else {
            a += value;
        }
    } else {
        if (b === null || b === '0'){
            b = value;
        } else {
            b += value;
        }
    }

    screenContent += value;
    screenElement.innerHTML = screenContent;
}
let numbersBtns = document.getElementsByClassName("standart");
for (let i = 0; i < numbersBtns.length; i++) {
    numbersBtns[i].addEventListener('click', setNumber, false);
}

// actions
function handleAction(){
    let result = null;
    let screenElement = document.getElementById('screen');
    let screenContent = this.innerHTML;
    
    if (screenContent !== '='){
        screenElement.innerHTML += screenContent;
        if(b !== null) {
            result = calc(action, a, b);
            if (result !== 'Error'){
                a = result;
                b = null;
                screenElement.innerHTML = result + screenContent;
                action = screenContent;
            } else {
                console.log(result);
            }
        } else {
            action = screenContent;
        }
    } else {
        result = calc(action, a, b);
        if (result !== 'Error'){
            screenElement.innerHTML = result;
            action = null;
            a = result;
            b = null;
        } else {
            console.log(result);
        }
    }
}
let actionsBtns = document.getElementsByClassName("btnBlue");
for (let i = 0; i < actionsBtns.length; i++) {
    actionsBtns[i].addEventListener('click', handleAction, false);
}

// remove 
function remove(){
    let str = document.getElementById('screen').innerHTML;
    str = str.slice(0, - 1);
    if(str.length === 0) {
        str = 0;
    }
    document.getElementById('screen').innerHTML = str;

    if (action !== null){
        if (b === null){
            action = null;
        } else {
            b = b.slice(0, -1);
        }
    } else {
        a = a.slice(0, - 1);
    }
}
document.getElementById("btnRemove").addEventListener("click", remove, false);