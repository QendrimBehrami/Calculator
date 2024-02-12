export class Parser {
    input; // The original input
    current; // The current position in the input string
    constructor(expression) {
        this.input = expression;
        this.current = 0;
    }
    /**
     * Check whether we have reached the end of the input string
     * @returns
     */
    isEof() {
        return this.current >= this.input.length;
    }
    /**
     * Return the character at the current position, without incrementing the pointer
     */
    peek() {
        return this.input.charAt(this.current);
    }
    /**
     * Advance the current pointer
     */
    advance() {
        this.current++;
    }
    /**
     * Check if the current char matches an expected character and advance if matched
     */
    match(expected) {
        if (this.isEof() || this.peek() != expected) {
            return false;
        }
        this.advance();
        return true;
    }
    isDigit(char) {
        return /\d/.test(char);
    }
    number() {
        let num = "";
        while (!this.isEof() &&
            (this.isDigit(this.peek()) || this.peek() === ".")) {
            num += this.peek();
            this.advance();
        }
        if (!this.isEof() && this.peek() === "%") {
            this.advance(); // Consume the percentage symbol
            return parseFloat(num) / 100; // Convert the percentage to a decimal
        }
        return parseFloat(num);
    }
    factor() {
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
        }
        else {
            return this.number();
        }
    }
    term() {
        let value = this.factor();
        while (!this.isEof() && (this.peek() === "*" || this.peek() === "/")) {
            if (this.peek() === "*") {
                this.match("*");
                value *= this.factor();
            }
            else if (this.peek() === "/") {
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
    expr() {
        let value = this.term();
        while (!this.isEof() && (this.peek() === "+" || this.peek() === "-")) {
            if (this.peek() === "+") {
                this.match("+");
                value += this.term();
            }
            else if (this.peek() === "-") {
                this.match("-");
                value -= this.term();
            }
        }
        return value;
    }
    parse() {
        return this.expr();
    }
}
//# sourceMappingURL=parser.js.map