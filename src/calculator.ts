const PRECISION = 6; // Precision of decimal numbers
import { Parser } from "./parser.js";

/**
 * Evaluate the mathematical expression by invoking the parser
 * @param expression
 * @returns evaluation
 */
function evaluate(expression: string): number {
  expression = expression.replace(/\s/g, ""); //Remove all whitespace
  // The expression may contain other characters for the operators, we need to replace them with the correct ones
  expression = expression.replace(/÷/g, "/"); // Replace ÷ with /
  expression = expression.replace(/×/g, "*"); // Replace × with *
  expression = expression.replace(/−/g, "-"); // Replace − with -

  let parser = new Parser(expression);
  return fix(parser.parse(), PRECISION);
}

/**
 * Round floating-point number if necessary
 * @param a number to round
 * @param precision number of significant digits
 * @returns rounded number
 */
function fix(a: number, precision: number) {
  return parseFloat(a.toFixed(precision));
}

/**
 * Update the display with the given string while ensuring that the display is valid
 * @param str the string to display
 * @param append whether to append the string to the display or replace it
 */
function updateDisplay(str: string, append: boolean = true) {
  let display = document.querySelector("#display") as HTMLInputElement;
  if (display === null || display.textContent == null)
    throw new Error("Display not found");

  if (!append) {
    display.textContent = str;
    return;
  }

  // Overwrite the display if the current value is 0 (and the string is a number) or an error
  if (
    (display.textContent === "0" && str.match(/\d/)) ||
    display.textContent == "Error"
  ) {
    display.textContent = "";
  }

  // Prevent multiple operators next to each other (minus is an exception, it can be used to input negative numbers)
  // Note: The parser can handle multiple unary minuses in a row, so we don't need to check for that
  if (
    display.textContent
      .charAt(display.textContent.length - 1)
      .match(/[÷×+*/−]/) &&
    str.match(/[÷×+*/]/)
  ) {
    display.textContent = display.textContent.slice(0, -1);
  }

  // Prevent multiple decimal points in a number, but allow them in different numbers
  if (str === ".") {
    // Find the index of the last operator
    let lastOperator = display.textContent
      .split("")
      .reverse()
      .join("")
      .search(/[÷×+*/−]/);
    // Get the number after the last operator
    let lastNumber = display.textContent.slice(-lastOperator);
    // If the last number contains a decimal point, don't allow another one
    if (lastNumber.includes(".") && str === ".") {
      return;
    }
  }

  // Handle the 00-button, which should only be allowed if the display is not 0
  if (str === "00" && display.textContent === "0") {
    return;
  }

  // Finally, append the string to the display
  display.textContent += str;
}

// Let the user input digits
let digitButtons = document.querySelectorAll(".button-digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent as string);
  });
});

// Let the user input operators
let operatorButtons = document.querySelectorAll(".button-operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent as string);
  });
});

// Let the user clear the display
let clearButton = document.querySelector("#button-clearAll");
clearButton?.addEventListener("click", () => {
  updateDisplay("0", false);
});

// Let the user evaluate the expression
let evaluateButton = document.querySelector("#button-evaluate");
evaluateButton?.addEventListener("click", () => {
  let display = document.querySelector("#display") as HTMLInputElement;
  if (display === null) throw new Error("Display not found");

  let expression = display.textContent as string;

  // Now the parser can evaluate the expression
  let result = evaluate(expression);

  // Check if result is NaN or Infinity
  if (isNaN(result) || !isFinite(result)) {
    updateDisplay("Error", false);
  } else {
    updateDisplay(result.toString(), false);
  }
});

// Let the user input a decimal point
let decimalButton = document.querySelector("#button-dot") as HTMLButtonElement;
decimalButton?.addEventListener("click", () => {
  let display = document.querySelector("#display") as HTMLInputElement;
  updateDisplay(".", true);
});
