"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const OPERATOR_REGEX = /[+\-*/]/g;
const PRECISION = 6; // Precision of decimal numbers
const parser_1 = require("./parser");
function evaluate(expression) {
    expression = expression.replace(/\s/g, ""); //Remove all whitespace
    let parser = new parser_1.Parser(expression);
    return fix(parser.parse(), PRECISION);
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
//# sourceMappingURL=calculator.js.map