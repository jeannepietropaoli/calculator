const NUMBERBUTTONS = document.querySelectorAll('.number');
const DISPLAYRESULT = document.querySelector('.result');
const OPERATORBUTTONS = document.querySelectorAll('.operator');
const EQUALBUTTON = document.querySelector('#equal');
const CLEARBUTTON = document.querySelector('#clear');
const DOTBUTTON = document.querySelector('#dot');
const BACKBUTTON = document.querySelector('#back');
const CURRENTOPERATION = document.querySelector('.currentOperation');
const LOGO = document.querySelector('.logo');
CURRENTOPERATION.textContent = '';
let value1 = '';
let value2 = '';
let operator = '';
let operatorActive = false;
let resultInStock=null;
let isFirstInputNumber = false;
let resultGiven = false;
let disableDot = false;
let onlyOneDecimal = true;
let currentValue;
let newCurrentValue;

function add(a,b) {
    return Number(a)+Number(b);
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,a,b){
    switch (operator) {
        case '+' :
            return add(a,b);
        case '-':
            return substract(a,b);
        case '*':
            return (b==0) ? '0' : multiply(a,b);
        case '':
           return (b==0) ? 'ERROR' : divide(a,b);
    }
}

function displayResults(value){
    DISPLAYRESULT.textContent = value;
}

function resetPara(){
    value1 = '';
    value2 = '';
    operator='';
    operatorActive = false;
    isFirstInputNumber = false;
    resultGiven = false; 
    resultInStock==='ERROR' ? DISPLAYRESULT.textContent = resultInStock : DISPLAYRESULT.textContent='';
    resultInStock=null;
    disableDot = false;
    onlyOneDecimal = true;
    CURRENTOPERATION.textContent = '';
}

function setValue1(n){ 
    if (disableDot) onlyOneDecimal = false;
    value1 += (n.textContent);
    CURRENTOPERATION.textContent += n.textContent;
    if (value1==='.') value1='0.';
    displayResults(value1);
    currentValue = value1;
}

function setValue2(n){
    if (disableDot) onlyOneDecimal = false;
    value2 += n.textContent;
    CURRENTOPERATION.textContent += n.textContent;
    if (value2==='.') value2='0.';
    displayResults(value2);
    currentValue = value2;
}

NUMBERBUTTONS.forEach(numberButton => {
    numberButton.addEventListener('click', function displayNumbers() {
        if (resultGiven) resetPara();
        if (!disableDot || disableDot && numberButton.textContent!=='.' && onlyOneDecimal===true){
            (!operatorActive) ? setValue1(numberButton) : setValue2(numberButton);
        }
        if (numberButton.textContent=='.') disableDot = true;
        isFirstInputNumber = true;

            OPERATORBUTTONS.forEach(operatorButton => {
                operatorButton.addEventListener('click', function displayOperator(){
                    disableDot = false;
                    onlyOneDecimal = true;
                    if (resultGiven) resultGiven=false;
                    if (isFirstInputNumber){
                        currentValue = '';
                        isFirstInputNumber = false;
                        operatorActive = true;
                        if (disableDot) disableDot = false;
                        operator = operatorButton.textContent;
                        CURRENTOPERATION.textContent += operatorButton.textContent;
                        currentValue = operator;
                        displayResults(operator);
                        if (resultInStock) {
                            value1 = resultInStock;
                            value2 = '';
                        }
                     }
                })
            })
        
        if (value1!=='' && value2!==''){
            resultInStock = operate(operator, value1, value2);
            if (resultInStock==='ERROR'){
                resetPara();
            }

            EQUALBUTTON.addEventListener('click', function displayResult(){
                (!resultInStock) ? DISPLAYRESULT.textContent = value1 :DISPLAYRESULT.textContent = resultInStock;
                resultGiven = true;
                CURRENTOPERATION.textContent = resultInStock;
            })
        }
    })
})

CLEARBUTTON.addEventListener('click', function(){
    resetPara()
})

function currentOperationBackspace(currentOp){
    operationAray = Array.from(currentOp.textContent);
    lastChar = operationAray[operationAray.length-1];
    if (lastChar!=='+' && lastChar!=='-' && lastChar!=='*' && lastChar!=='/' ){
        currentOp.textContent = (operationAray.slice(0, operationAray.length-1)).join('');
    } else {
        isFirstInputNumber = false;
    }
}

BACKBUTTON.addEventListener('click', function backspace(){
    currentOperationBackspace(CURRENTOPERATION);
    if (currentValue===value1 || currentValue===value2){
        newCurrentValue = Array.from(currentValue);
        if (newCurrentValue[newCurrentValue.length-1]==='.') {
            disableDot = false;
        }
        newCurrentValue =  newCurrentValue.slice(0, newCurrentValue.length-1);
        if (currentValue===value1) {
            value1 = newCurrentValue.join('')
            currentValue = value1;
            DISPLAYRESULT.textContent = value1
        } else {
            value2 = newCurrentValue.join('')
            currentValue = value2;
            DISPLAYRESULT.textContent = value2;
        }
    if (!onlyOneDecimal) onlyOneDecimal = true;
    }
})

LOGO.addEventListener('mouseover', function(){
    LOGO.src = 'logoHover.jpg';
})

LOGO.addEventListener('mouseout', function(){
    LOGO.src = 'iconGit.jpg';
})