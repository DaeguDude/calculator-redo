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

// firstNumber
let firstNum = Number(display.innerHTML);

// currentNumber that has been input by user
let currentNum = '';

// operator to operate on the numbers
let operator = '';



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
    // Number on the display becomes the first number to be operated on
    firstNum = Number(display.innerHTML);
    currentNum = '';
    operator = operators[i].innerHTML;
  })
}

// User presses an equal key
equal.addEventListener('click', (event) => {
  // This means nothing is missing!
  // 2 numbers and 1 operator
  if(firstNum != ''
   && currentNum != ''
   && operator != '') {
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



