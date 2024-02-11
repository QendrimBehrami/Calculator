const OPERATOR_REGEX = /[+\-*/]/g;
const PRECISION = 6; // Precision of decimal numbers

import { Parser } from "./parser.js";

/**
 * Evaluate the mathematical expression by invoking the parser
 * @param expression
 * @returns evaluation
 */
function evaluate(expression: string): number {
  expression = expression.replace(/\s/g, ""); //Remove all whitespace
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

// Website wiring :D
let display = document.querySelector("#display");
let digitButtons = document.querySelectorAll(".button-digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Pressed " + button.textContent);
  });
});

if (display?.textContent != null) {
  display.textContent = "Hallo";
}
