export class Parser {
  input: string; // The original input
  current: number; // The current position in the input string

  constructor(expression: string) {
    this.input = expression;
    this.current = 0;
  }

  /**
   * Check whether we have reached the end of the input string
   * @returns
   */
  private isEof(): boolean {
    return this.current >= this.input.length;
  }

  /**
   * Return the character at the current position, without incrementing the pointer
   */
  private peek(): string {
    return this.input.charAt(this.current);
  }

  /**
   * Advance the current pointer
   */
  private advance(): void {
    this.current++;
  }

  /**
   * Check if the current char matches an expected character and advance if matched
   */
  private match(expected: string): boolean {
    if (this.isEof() || this.peek() != expected) {
      return false;
    }
    this.advance();
    return true;
  }

  private isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private number(): number {
    let num = "";
    while (
      !this.isEof() &&
      (this.isDigit(this.peek()) || this.peek() === ".")
    ) {
      num += this.peek();
      this.advance();
    }
    return parseFloat(num);
  }

  private factor(): number {
    //Handle unary minus
    if (this.peek() == "-") {
      this.match("-"); //consume it
      return -this.factor();
    }
    if (this.peek() === "(") {
      this.match("(");
      let value = this.expr();
      this.match(")");
      return value;
    } else {
      return this.number();
    }
  }

  private term(): number {
    let value = this.factor();
    while (!this.isEof() && (this.peek() === "*" || this.peek() === "/")) {
      if (this.peek() === "*") {
        this.match("*");
        value *= this.factor();
      } else if (this.peek() === "/") {
        this.match("/");
        let divisor = this.factor();
        if (divisor == 0) {
          console.error("Division by 0");
          return NaN;
        }
        value /= divisor;
      }
    }
    return value;
  }

  private expr(): number {
    let value = this.term();
    while (!this.isEof() && (this.peek() === "+" || this.peek() === "-")) {
      if (this.peek() === "+") {
        this.match("+");
        value += this.term();
      } else if (this.peek() === "-") {
        this.match("-");
        value -= this.term();
      }
    }
    return value;
  }

  public parse(): number {
    return this.expr();
  }
}
