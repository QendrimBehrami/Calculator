import { evaluate } from "../src/calculator";

// Describe block for grouping related tests
describe("evaluate function", () => {
  // Test case for addition
  test("adds two numbers", () => {
    // Arrange: Define the input numbers and the expected result
    const expression = "2+11";
    const expectedResult = 13;

    // Act: Call the evaluate function with the input
    const result = evaluate(expression);

    // Assert: Check if the result matches the expected result
    expect(result).toBe(expectedResult);
  });
});
