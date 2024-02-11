import { evaluate } from "../src/calculator";

describe("Arithmetic operations", () => {
  it("should add two numbers", () => {
    const result = evaluate("3 + 4");
    expect(result).toEqual(7);
  });

  it("should subtract two numbers", () => {
    const result = evaluate("10 - 5");
    expect(result).toEqual(5);
  });

  it("should multiply two numbers", () => {
    const result = evaluate("6 * 8");
    expect(result).toEqual(48);
  });

  it("should divide two numbers", () => {
    const result = evaluate("15 / 3");
    expect(result).toEqual(5);
  });

  it("should handle division by zero", () => {
    const result = evaluate("10 / 0");
    expect(result).toBeNaN();
  });
});
