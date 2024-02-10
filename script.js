const OPERATORS = ["÷", "×", "−", "+"];
const OPERATOR_PATTERN = /[÷×−+]/;

// Display
let display = document.querySelector("#display");

// Digit buttons
let digitButtons = document.querySelectorAll(".button-digit");
digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", function (e) {
    appendDigit(digitButton.textContent);
  });
});

// Operator buttons
let operatorButtons = [
  document.querySelector("#button-addition"),
  document.querySelector("#button-subtraction"),
  document.querySelector("#button-multiplication"),
  document.querySelector("#button-division"),
];

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", function (e) {
    appendOperator(operatorButton.textContent);
  });
});

let equalsButton = document.querySelector("#button-equals");
equalsButton.addEventListener("click", evaluate);

function appendDigit(digit) {
  // Eliminate leading 0
  if (display.textContent === "0") {
    display.textContent = "";
  }
  display.textContent += digit;
}

function appendOperator(operator) {
  let displayText = display.textContent;
  // Prevent two operators in a row by replacing the last operator
  if (OPERATORS.includes(displayText[display.textContent.length - 1])) {
    display.textContent = displayText(0, -1) + operator;
    // Perform an evaluation if there's already an operator present
  } else if (OPERATOR_PATTERN.test(displayText)) {
    evaluate();
    display.textContent += operator;
  } else {
    display.textContent += operator;
  }
}

function evaluate() {
  let displayText = display.textContent;
  let expression = displayText.split(OPERATOR_PATTERN); // This should produce an array of 2 strings (which should parse to numbers)
  let result;

  // Match the correct operator
  if (displayText.includes("+")) {
    result = add(expression[0], expression[1]);
  } else if (displayText.includes("−")) {
    result = subtract(expression[0], expression[1]);
  } else if (displayText.includes("×")) {
    result = multiply(expression[0], expression[1]);
  } else if (displayText.includes("÷")) {
    result = divide(expression[0], expression[1]);
    if (Number.isNaN(result)) {
      return; // Naughty
    }
  }

  // Update with rounded number
  display.textContent = parseFloat(result.toFixed(6));
}

function add(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a + b;
}

function subtract(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a - b;
}

function multiply(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a * b;
}

function divide(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (b == 0) {
    alert("Username tried to divide by zero. This incident will be reported.");
  }
  return a / b;
}
