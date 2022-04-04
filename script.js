const NUMBERBUTTONS = document.querySelectorAll('.number');
const DISPLAYRESULT = document.querySelector('.result');
const OPERATORBUTTONS = document.querySelectorAll('.operator');
const EQUALBUTTON = document.querySelector('#equal');
let value1 = '';
let value2 = '';
let operator;
let operatorActive = false;
let resultInStock=null;

function add(a,b) {
    return a+b;
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
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}

NUMBERBUTTONS.forEach(numberButton => {
    numberButton.addEventListener('click', function displayNumbers() {
        if (!operatorActive) {
            value1 += numberButton.textContent;
            DISPLAYRESULT.textContent = value1;
        } else {
            value2 += numberButton.textContent;
            DISPLAYRESULT.textContent = value2;
        }
        OPERATORBUTTONS.forEach(operatorButton => {
            operatorButton.addEventListener('click', function displayOperator(){
                operatorActive = true;
                operator = operatorButton.textContent;
                DISPLAYRESULT.textContent = operator;
                if (resultInStock) {
                    value1 = resultInStock;
                    value2 = '';
                }
            })
        })
        if (value1!=='' && value2!==''){
            resultInStock = operate(operator, value1, value2);
            EQUALBUTTON.addEventListener('click', function displayResult(){
                DISPLAYRESULT.textContent = resultInStock;
            })
        }
    })
})
