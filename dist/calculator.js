const PRECISION = 6; // Precision of decimal numbers
import { Parser } from "./parser.js";
/**
 * Evaluate the mathematical expression by invoking the parser
 * @param expression
 * @returns evaluation
 */
function evaluate(expression) {
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
function fix(a, precision) {
    return parseFloat(a.toFixed(precision));
}
function adjustDisplayFontSize() {
    const maxFontSize = 48; // Maximum font size in pixels
    const minFontSize = 8; // Minimum font size in pixels
    let fontSize = maxFontSize;
    let display = document.querySelector("#display");
    if (display === null || display.value == null)
        throw new Error("Display not found");
    display.style.fontSize = `${fontSize}px`;
    while (display.scrollWidth > display.offsetWidth && fontSize > minFontSize) {
        fontSize--;
        display.style.fontSize = `${fontSize}px`;
    }
}
/**
 * Update the display with the given string while ensuring that the display is valid
 * @param str the string to display
 * @param append whether to append the string to the display or replace it
 */
function updateDisplay(str, append = true) {
    let display = document.querySelector("#display");
    if (display === null || display.value == null)
        throw new Error("Display not found");
    if (!append) {
        display.value = str;
        adjustDisplayFontSize();
        return;
    }
    let fullOperatorRegex = /[÷×+*/−]/;
    // Overwrite the display if the current value is 0 (and the string is a number) or an error
    if ((display.value === "0" && str.match(/\d/)) || display.value == "Error") {
        display.value = "";
    }
    // Prevent multiple operators next to each other (minus is an exception, it can be used to input negative numbers)
    // Note: The parser can handle multiple unary minuses in a row, so we don't need to check for that
    if (display.value.charAt(display.value.length - 1).match(fullOperatorRegex) &&
        str.match(/[÷×+*/]/)) {
        display.value = display.value.slice(0, -1);
    }
    let lastNumber = display.value.split(fullOperatorRegex).pop();
    // Prevent multiple decimal points in a number, but allow them in different numbers
    if (str === ".") {
        // If the last number contains a decimal point, don't allow another one
        if (lastNumber.includes(".") && str === ".") {
            return;
        }
    }
    // Handle the 00-button, if the last number is not 0 or empty, append the string
    if (str === "00" && (!lastNumber || lastNumber === "0")) {
        return;
    }
    // Prevent multiple percentage symbols in a number
    if (str === "%") {
        if (!lastNumber || lastNumber.includes("%")) {
            return;
        }
    }
    // Finally, append the string to the display
    display.value += str;
    adjustDisplayFontSize();
}
// Let the user input digits
let digitButtons = document.querySelectorAll(".button-digit");
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});
// Let the user input operators
let operatorButtons = document.querySelectorAll(".button-operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});
// Let the user clear the display
let clearButton = document.querySelector("#button-clearAll");
clearButton?.addEventListener("click", () => {
    updateDisplay("0", false);
    adjustDisplayFontSize();
});
// Let the user clear the last input
let clearLastButton = document.querySelector("#button-clearLast");
clearLastButton?.addEventListener("click", () => {
    let display = document.querySelector("#display");
    if (display === null || display.value == null)
        throw new Error("Display not found");
    display.value = display.value.slice(0, -1);
    if (display.value === "") {
        display.value = "0";
    }
    adjustDisplayFontSize();
});
// Let the user input a percentage
let percentButton = document.querySelector("#button-percent");
percentButton?.addEventListener("click", () => {
    updateDisplay("%", true);
});
// Let the user evaluate the expression
let evaluateButton = document.querySelector("#button-evaluate");
evaluateButton?.addEventListener("click", () => {
    let display = document.querySelector("#display");
    if (display === null)
        throw new Error("Display not found");
    let expression = display.value;
    // Now the parser can evaluate the expression
    let result = evaluate(expression);
    // Check if result is NaN or Infinity
    if (isNaN(result) || !isFinite(result)) {
        updateDisplay("Error", false);
    }
    else {
        updateDisplay(result.toString(), false);
    }
});
// Let the user input a decimal point
let decimalButton = document.querySelector("#button-dot");
decimalButton?.addEventListener("click", () => {
    let display = document.querySelector("#display");
    updateDisplay(".", true);
});
//# sourceMappingURL=calculator.js.map