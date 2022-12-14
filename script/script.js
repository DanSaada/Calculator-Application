/**
 * This function initialize/clears all variables associated with the display of a calculator. 
 */
 function initializeDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

 //initialize variables to track the current state of a calculator.
 initializeDisplay();

 //select all button elements on the page and store them in a nodelist variable 'buttons'.
 const buttons = document.querySelectorAll('button');

 /**
 * Here we listen for keydown events and then searche the document for
 * a button with a "data-key" attribute that matches the keyCode of the event.
 * When it finds a match, it triggers a click event on that button.
 */
 window.addEventListener('keydown', function(e){
     const key = document.querySelector(`button[data-key='${e.keyCode}']`);
     key.click();
 });

/**
 * This function adds 2 numbers
 * @param  x - first operand
 * @param  y - second operand
 * @return the addition between x and y
 */
 function add(x,y) {
    return x + y;
}

/**
 * This function subtract 2 numbers
 * @param  x - first operand
 * @param  y - second operand
 * @return the subtract between x and y
 */
function sub(x,y) {
    return x - y;
}

/**
 * This function multiplys 2 numbers
 * @param  x - first operand
 * @param  y - second operand
 * @return the multipication between x and y
 */
function mul(x,y) {
    return x * y;
}

/**
 * This function divides 2 numbers
 * @param  x - first operand
 * @param  y - second operand
 * @return the division between x and y
 */
function div(x,y) {
    if(y === 0) {
        return 'Error';
    } else {
    return x / y;
    }
}

/**
 * This function operates an aritmetic operation
 * @param  x - first operand
 * @param  y - second operand
 * @param  op - operator
 * @return the result of an operator between 2 operands
 */
function operate(x, y, op) {
    if(op === '+') {
        return add(x,y);
    } else if(op === '-') {
        return sub(x,y);
    } else if(op === '*') {
        return mul(x,y);
    } else if(op === '/') {
       return div(x,y);
    }
}

/**
 * This function rounds a number to a specified number of decimal places.
 * @param  num - the number to round
 * @param  places - the number of decimal places to round to
 * @return the rounded float number
 */
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

/**
 * This function updates the display element of an HTML page with the value
 * of a variable called 'displayValue'.
 * If the length of the displayValue is greater than 9, the display will be
 * shortened to the first 9 characters.
 */
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        //making the display to store only first 9 characters
        display.innerText = displayValue.substring(0, 9);
    }
}

/**
 * This function is used to add an event listener to the buttons array elements.
 * It checks the classList of each element to determine the type of button, andthen
 * performs the appropriate action and updates the display.
 */
function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                initializeDisplay();
                updateDisplay();
        }
    )}
}

/**
 * This function is used to evaluate an operator.
 * It takes an operator in the form of a string and then evaluates the equation
 * using the firstOperand, secondOperand, and the operator. If the equation results
 * in an error, the displayValue is set to 'lmao', otherwise the result is rounded
 * to 15 decimal places and stored as the displayValue. After the equation is 
 * evaluated, the first and second operands and operators are reset to null.
 */
function handleEquals(operator) {
    secondOperand = displayValue;
    result = operate(Number(firstOperand), Number(secondOperand), operator);
    // check if there was an error
    if(result === 'Error') {
        displayValue = 'Error';
    } else {
        displayValue = roundAccurately(result, 7).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}

/**
 * This function handles the display value acorrding to the equals sign.
 */
function inputEquals() {
    //hitting equals doesn't display undefined before operate function
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        handleEquals(secondOperator)
    } else {
        //handles first operation
        handleEquals(firstOperator)
    }
}

/**
 * This function takes an operand and updates the displayValue accordingly
 * @param operand
 */
function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            //handles first operand input (click 1)
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            //starts new operation after inputEquals
            displayValue = operand;
        } else {
            //add a digit to the display
            displayValue += operand;
        }
    } else { // first operator already exists
        //inputs to secondOperand (click 3 or 5)
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

/**
 * This function takes an operator and updates the displayValue accordingly
 * @param operator
 */
function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //handles input of second operator (click 4)
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 7).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //new secondOperator (click 6)
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 7).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //handles first operator input (click 2)
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

/**
 * This function checks if a decimal point is included in the displayValue string.
 * If it is not, it adds the dot to the end of the displayValue string. If the
 * displayValue string is equal to the first or second operand, it sets the displayValue
 * to '0' and adds the dot to the end.
 * @param  dot - a decimal point
 */
function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

/**
 * This function sets the displayValue variable to the num divided by 100, and
 * converts it to a string and stores it in the variable displayValue.
 * @param  num - a number
 */
function inputPercent(num) {
    displayValue = (num/100).toString();
}

/**
 * This function multiplies a number by -1, and converts it to a string and stores
 * it in the variable displayValue
 * @param  num - a number
 */
function inputSign(num) {
    displayValue = (num * -1).toString();
}

/**
 * This function removes an operand from the display if it exists
 */
function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

/**
 * This function update the display and checks for next click insertion.
 */
function run() {
    updateDisplay();
    clickButton();
}

run();
