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
  } else if(operator === 'x') {
    return multiply(num1, num2);
  } else if(operator === '÷') {
    return divide(num1, num2);
  }
}

// Function that will populate the display.
// It's passed a value, which can be an operator, a number,
// or anything else
function populateDisplay(value) {

  // If there's no input yet, replace 0 with a new input
  if(display.innerHTML === '0') {
    display.innerHTML = value;
  } else {
    // If there's already an input, just add the value
    display.innerHTML = display.innerHTML + value;
    updateDisplayValue(display.innerHTML);
  }
}

// Update Display Value
function updateDisplayValue(display) {
  displayValue = display;
}

// Adding event listeners to all number elements
// If number button is clicked, it will populate the display.
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    let number = numbers[i].innerHTML;
    populateDisplay(number);
  })
}

// If operator is clicked
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {    
  })
}

// User presses an equal key
equal.addEventListener('click', (event) => {

})



