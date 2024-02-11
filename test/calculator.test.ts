import { evaluate } from "../src/calculator";

describe("Arithmetic operations", () => {
  // Easy expressions
  it("should add two numbers", () => {
    const result = evaluate("3 + 4");
    expect(result).toEqual(7);
  });

  it("should subtract two numbers", () => {
    const result = evaluate("10-5");
    expect(result).toEqual(5);
  });

  it("should multiply two numbers", () => {
    const result = evaluate("6*8");
    expect(result).toEqual(48);
  });

  it("should divide two numbers", () => {
    const result = evaluate("15/3");
    expect(result).toEqual(5);
  });

  it("should handle division by zero", () => {
    const result = evaluate("10 / 0");
    expect(result).toBeNaN();
  });

  // Negative numbers
  it("should handle adding positive and negative numbers", () => {
    const result = evaluate("-10+5");
    expect(result).toBe(-5);
  });

  it("should handle adding negative and negative numbers", () => {
    const result = evaluate("-10+-5");
    expect(result).toBe(-15);
  });

  it("should handle multiplying positive and negative numbers", () => {
    const result = evaluate("4*-11");
    expect(result).toBe(-44);
  });

  it("should handle multiplying negative and negative numbers", () => {
    const result = evaluate("-2*-5");
    expect(result).toBe(10);
  });

  //Floating-point numbers
  it("should handle adding floating point numbers", () => {
    const result = evaluate("1.5+0.2");
    expect(result).toBe(1.7);
  });

  it("should handle subtracting floating point numbers", () => {
    const result = evaluate("-1.0-2.2");
    expect(result).toBe(-3.2);
  });

  it("should handle multiplying floating point numbers", () => {
    const result = evaluate("0.5*0.25");
    expect(result).toBe(0.125);
  });

  it("should handle dividing floating point numbers", () => {
    const result = evaluate("-1.5/0.25");
    expect(result).toBe(-6);
  });

  // TODO: Parenthesis, Malformed Expressions, Multiple Unary Minus and Overflow/Underflow
});
