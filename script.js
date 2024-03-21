
// This class represents a basic calculator functionality.

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        // Initialize calculator with previous and current operand text elements.
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // Initialize calculator to its default state.
        this.clear();
    }

    // Function to clear all operands and the operation.
    clear(){
       this.currentOperand = '';
       this.previousOperand = '';
       this.operation = undefined;
    }

    // Function to delete the last digit entered.
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Function to append a number or decimal point to the current operand.
    appendNumber(number){
        // Ensure only one decimal point is allowed.
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Function to choose the operation (+, -, *, /).
    chooseOperation(operation){
        // Ensure there's a current operand before proceeding.
        if(this.currentOperand === '') return;
        // Compute if there's a previous operand.
        if(this.previousOperand !== ''){
            this.compute();
        }
        // Store the chosen operation and move current operand to previous operand.
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Function to compute the result of the operation.
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Ensure both previous and current operands are numbers.
        if(isNaN(prev) || isNaN(current)) return;
        // Perform the operation based on the chosen operator.
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        // Update current operand with the result and clear previous operands.
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Function to format numbers for display.
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay;
        }
    }

    // Function to update the display with current operands and operation.
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Selecting elements from the DOM.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Initializing a new calculator object.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event listeners for number buttons.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Event listeners for operation buttons.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Event listener for the equals button.
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// Event listener for the all clear button.
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// Event listener for the delete button.
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
