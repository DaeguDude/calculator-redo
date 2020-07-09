"use strict"

// Display Element
const display = document.getElementById('display');

// number-section element
const numberSection = document.getElementById('number-section');

// A variable to store the display value
let displayValue = '';

// All number elements
const numbers = document.getElementsByClassName("number");

// deciaml element
const decimal = document.getElementById('decimal');

// Basic Operators
const operators = document.getElementsByClassName("operator");

// equal element
const equal = document.getElementById('equal');

// clear element
const clear = document.getElementById('clear');

// delete element
const del = document.getElementById('delete');

// firstNumber
let firstNum = Number(numberSection.innerHTML);

// currentNumber that has been input by user
let currentNum = '';

// operator to operate on the numbers
let operator = '';

// This will let me know if the first number is negative or not
let isFirstNumNegative = false;



function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if(operator === '+') {
    return add(num1, num2);
  } else if(operator === '-') {
    return subtract(num1, num2);
  } else if(operator === '×') {
    return multiply(num1, num2);
  } else if(operator === '÷') {
    return divide(num1, num2);
  }
}

// Function that will populate the display.
function populateDisplay(value) {
  numberSection.innerHTML = value;
  
  // To show some sort of effect to indicate it is being processed.
  display.blur() 
  setTimeout(function() {
    display.focus();
  }, 50);

  /**
   * if the text is overflowing, change the text direction to make
   * new numbers to push old numbers
   */ 
  let displayWidth = display.clientWidth;
  let numberSectionWidth = numberSection.clientWidth;
  let isTextOverflowing = (displayWidth - 25 <= numberSectionWidth);

  if(isTextOverflowing === true) {
    numberSection.style.direction = 'rtl';
  } else {
    numberSection.style.direction = 'ltr';
  }
  
}

// This will make everything clean, makes sure that
// user starts fresh
function allClear() {
  // Setting all the values to the starting values.
  firstNum = 0;
  currentNum = '';
  operator = '';
}

function checkDisplayFocus() {
  let isFocused = false;
  
  // document.activeElement shows the element that has the focus
  // within the document
  if(display === document.activeElement) {
    isFocused = true;
  }

  // Return either true or false
  return isFocused;
}

function executeNumber(num) {  
  /** Take a number as an argument, and put that
    * on the variable 'currentNum', which will be passed
    * on to the displayValue and populate the display
    */ 

  // Current Number that is being inputted
  currentNum += num;

  // Update Display
  displayValue = currentNum;
  populateDisplay(displayValue);
}

function executeOperator(basicOperator) {
  // When operator is clicked, first check if the clicked operator
  // is the first input in the calculator without any numbers or operations
  if(firstNum === 0
    && currentNum === ''
    && operator === '') {
      // And then you need to check if it's '-'
      if(basicOperator === '-') {
        // First number will become a negative number
        isFirstNumNegative = true;
      } 
    populateDisplay(displayValue);  
  } else if(
    // Because there are 2 numbers and 1 operator,
    // I should do a calculation.
    firstNum != undefined
    && currentNum != ''
    && operator != ''
  ) {
    if(operator === '÷' && Number(currentNum) === 0) {
      displayValue = 'Error';
      populateDisplay(displayValue);
      // starts fresh
      allClear();

    } else {
      let answer = operate(operator, firstNum, Number(currentNum));
      // This will round answers with upto 4 decimal point
      answer = Math.round(answer * 10000) / 10000;
  
      // Update the answer to the display
      displayValue = answer;
      populateDisplay(displayValue);
  
      // After showing the answer, first erase all the values
      // first number to calculate is the answer we just calculated
      // And then operator is the operator that was just clicked
      allClear();
      firstNum = answer;
      operator = basicOperator;
    }
  } else if(
    firstNum != undefined
    && operator != ''
    && currentNum == ''
  ) {
    // If there's a first number and an operator in the variable,
    // but no current number, it means user has clicked operator
    // two times, thus just replacing the operator
    operator = basicOperator
    populateDisplay(displayValue);
  } else {
    // If it's not your first input, first check your first number
    // should be a negative number or not
    if(isFirstNumNegative === true) {
      // My first number becomes a negative
      firstNum = Number(displayValue) * -1;
      // Make it back to false for the next operation
      isFirstNumNegative = false;
      
      // Update Display
      displayValue = firstNum;
      populateDisplay(displayValue);
    } else {
      // Put current number to the firstNum, so ready for next
      // operation
      firstNum = Number(currentNum);
      populateDisplay(displayValue);
    }
    
    // Ready for a next operation
    currentNum = '';
    operator = basicOperator;

    // // Update display
    // displayValue = firstNum;
    // populateDisplay(displayValue);
  }
}

function executeDelete() {
  if(currentNum != '') {
    currentNum = currentNum.slice(0, -1);
    displayValue = currentNum;
    populateDisplay(displayValue);
  }
}

function executeEqual() {
  // This means nothing is missing! 2 numbers and 1 operator
  // First Number has always value, at least 0, which can be 
  // replaced with other numbers, so it's omitted here. No need to check
  // for its emptiness 
  if(currentNum != '' && operator != '') {
    // If user is trying to divide by 0
    if(operator === '÷' && Number(currentNum) === 0) {
      displayValue = 'Error';
      populateDisplay(displayValue);
      
      // starts fresh
      allClear();
    } else {
      let answer = operate(operator, firstNum, Number(currentNum));
      // This will round answers with upto 4 decimal point
      answer = Math.round(answer * 10000) / 10000;
  
      // Update the answer to the display
      firstNum = answer;
      displayValue = answer;
      populateDisplay(displayValue);
  
      // This makes sure after answer is shown, when user clicks
      // another number button, they start clean(new numbers).
      currentNum = '';
      
    }
  } else {
    populateDisplay(displayValue);
  }
}

function executeDecimal() {
  // If there's no decimal found, put the decimal point.
  if(currentNum.indexOf('.') === -1) {
    currentNum += '.';

    displayValue = currentNum;
    populateDisplay(displayValue);
  } else {
    // otherwise do nothing
    populateDisplay(displayValue);
  }
}




// Adding event listeners to all number elements
// If number button is clicked, it will populate the display.
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    console.log(numbers[i])
    let number = numbers[i].innerHTML;
    executeNumber(number);
  })
}

// If operator is clicked
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {    
    let currentOperator = operators[i].innerHTML;
    executeOperator(currentOperator);
    
  }) // event listener
} // for loop

// If decimal button is clicked, put the decimal point
// in the number
decimal.addEventListener('click', (event) => {
  executeDecimal();
})


// If user presses 'AC', it removes all the existing data
// and user starting clean like first setup.
clear.addEventListener('click', (event) => {
  // First make everything clean
  allClear();

  // Populate display
  displayValue = firstNum;
  populateDisplay(displayValue);
})

// If user presses 'del' button, it will remove the current
// number being typed. But it wouldn't remove the number
// that has been passed ready for the operation.
del.addEventListener('click', (event) => {
  executeDelete();
})

// User presses an equal key
equal.addEventListener('click', (event) => {
  executeEqual();
})

document.addEventListener('keydown', (event) => {
  let keyName = event.key;
  const keyAscii = (event.key).charCodeAt();

  const isNumber = (keyAscii >= 48 && keyAscii <= 57);
  
  const isOperator = (
    keyName === '+'
    || keyName === '-'
    || keyName === '*'
    || keyName === '/'
  );

  /** Because the multiply and division character is ×, ÷ in the 
   * function 'operate' we need to change the passed value of '*', '/'
   * to '×', '÷' to make function 'operate' work.
   */
  if(isOperator === true) {
    if(keyName === '*') {
      keyName = '×';
    }
    if(keyName === '/') {
      keyName = '÷';
    }
  }

  const isDecimal = (keyName === '.');
  const isBackspace = (keyName === 'Backspace');
  const isEnter = (keyName === 'Enter');

  if(checkDisplayFocus() === true) {
    if(isNumber) {
      let number = keyName;
      executeNumber(number);
    } else if(isOperator) {
      let operator = keyName;
      executeOperator(operator);
    } else if(isDecimal) {
      executeDecimal();
    } else if(isBackspace) {
      executeDelete();
    } else if(isEnter) {
      executeEqual();
    }
  }
}) 




