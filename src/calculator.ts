const OPERATOR_REGEX = /[+\-*/]/g;
const PRECISION = 6; // Precision of decimal numbers

import { Parser } from "./parser";

export function evaluate(expression: string): number | null {
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
