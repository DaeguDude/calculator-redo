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

// firstNumber
let firstNum = Number(display.innerHTML);

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
}

// This will make everything clean, makes sure that
// user starts fresh
function allClear() {
  // Setting all the values to the starting values.
  firstNum = 0;
  currentNum = '';
  operator = '';
}



// Adding event listeners to all number elements
// If number button is clicked, it will populate the display.
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    // Number that has been clicked
    let number = numbers[i].innerHTML;
    
    // Current Number that is being inputted
    currentNum += number;

    // Update Display
    displayValue = currentNum;
    populateDisplay(displayValue);
  })
}

// If operator is clicked
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {    

    // When operator is clicked, first check if the clicked operator
    // is the first input in the calculator without any numbers or operations
    if(firstNum === 0
      && currentNum === ''
      && operator === '') {
        // And then you need to check if it's '-'
        if(operators[i].innerHTML === '-') {
          // First number will become a negative number
          isFirstNumNegative = true;
        } 
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
        operator = operators[i].innerHTML;
      }
    } else if(
      firstNum != undefined
      && operator != ''
      && currentNum == ''
    ) {
      // If there's a first number and an operator in the variable,
      // but no current number, it means user has clicked operator
      // two times, thus just replacing the operator
      operator = operators[i].innerHTML
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
      }
      
      // Ready for a next operation
      currentNum = '';
      operator = operators[i].innerHTML;

      // // Update display
      // displayValue = firstNum;
      // populateDisplay(displayValue);
    }
  }) // event listener
} // for loop

// If decimal button is clicked, put the decimal point
// in the number
decimal.addEventListener('click', (event) => {
  // If there's no decimal found, put the decimal point.
  if(currentNum.indexOf('.') === -1) {
    currentNum += '.';

    displayValue = currentNum;
    populateDisplay(displayValue);
  } // otherwise do nothing

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

// User presses an equal key
equal.addEventListener('click', (event) => {
  // This means nothing is missing! 2 numbers and 1 operator
  // First Number has always value, at least 0, which can be 
  // replaced with other numbers, so it's omitted here. No need to check
  // for its emptiness 
  if(currentNum != '' && operator != '') {
    // If user is trying to divide by 0
    if(operator === '÷' && Number(currentNum) === 0) {
      displayVale = 'Error';
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
   }
})



