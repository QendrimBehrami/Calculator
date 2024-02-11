"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const OPERATOR_REGEX = /[+\-*/]/g;
const PRECISION = 6; // Precision of decimal numbers
function evaluate(expression, lastResult = null) {
    let operands = expression.split(OPERATOR_REGEX);
    const operators = Array.from(expression.matchAll(OPERATOR_REGEX), (match) => ({
        operator: match[0],
        position: match.index,
    }));
    // Binary expression
    if (operands.length == 2) {
        let a = operands[0];
        let b = operands[1];
        switch (operators[0].operator) {
            case "+":
                return add(a, b);
            case "-":
                return sub(a, b);
            case "*":
                return mul(a, b);
            case "/":
                return div(a, b);
        }
    }
    return null;
}
exports.evaluate = evaluate;
/**
 * Round floating-point number if necessary
 * @param a number to round
 * @param precision number of significant digits
 * @returns rounded number
 */
function fix(a, precision) {
    return parseFloat(a.toFixed(precision));
}
function add(a, b) {
    let operand1 = parseFloat(a);
    let operand2 = parseFloat(b);
    return fix(operand1 + operand2, PRECISION);
}
function sub(a, b) {
    let operand1 = parseFloat(a);
    let operand2 = parseFloat(b);
    return fix(operand1 - operand2, PRECISION);
}
function mul(a, b) {
    let operand1 = parseFloat(a);
    let operand2 = parseFloat(b);
    return fix(operand1 * operand2, PRECISION);
}
function div(a, b) {
    let operand1 = parseFloat(a);
    let operand2 = parseFloat(b);
    if (operand2 == 0) {
        console.error("Division by zero!");
        return NaN;
    }
    return fix(operand1 / operand2, PRECISION);
}
