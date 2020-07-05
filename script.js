"use strict"

// Display Element
const display = document.getElementById('display');

// A variable to store the display value
let displayValue = '';

// All number elements
const numbers = document.getElementsByClassName("number");

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
    display.innerHTML = value;
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
    populateDisplay(currentNum);
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
    } else {
      // If it's not your first input, first check your first number
      // should be a negative number or not
      if(isFirstNumNegative === true) {
        // My first number becomes a negative
        firstNum = Number(display.innerHTML) * -1;
        // Make it back to false
        isFirstNumNegative = false;
      } else {
        // If yours don't need to be a negative number, just a positive number
        firstNum = Number(display.innerHTML);
      }
      
      // Ready for a next operation
      currentNum = '';
      operator = operators[i].innerHTML;
      populateDisplay(firstNum);
    }
  }) // event listener
} // for loop

// If user presses 'AC', it removes all the existing data
// and user starting clean like first setup.
clear.addEventListener('click', (event) => {
  // Setting all the values to the starting values.
  firstNum = 0;
  currentNum = '';
  operator = '';
  
  populateDisplay(firstNum);
})

// User presses an equal key
equal.addEventListener('click', (event) => {
  // This means nothing is missing! 2 numbers and 1 operator
  // First Number has always value, at least 0, which can be 
  // replaced with other numbers, so it's omitted here. No need to check
  // for its emptiness 
  if(currentNum != '' && operator != '') {
    let answer = operate(operator, firstNum, Number(currentNum));
    // This will round answers with upto 4 decimal point
    answer = Math.round(answer * 10000) / 10000;

    // Update the answer to the display
    populateDisplay(answer);

    // This makes sure after answer is shown, when user clicks
    // another number button, they start clean(new numbers).
    currentNum = '';
   }
})



