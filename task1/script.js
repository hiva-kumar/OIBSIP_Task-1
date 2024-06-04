// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        
        if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.textContent = '0';
        } else if (button.id === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (button.id === 'equals') {
            if (previousInput && currentInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
                previousInput = '';
                operator = null;
            }
        } else if (button.id === 'percentage') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            }
        } else if (button.id === 'sqrt') {
            if (currentInput) {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
            }
        } else if (button.id === 'left-bracket' || button.id === 'right-bracket') {
            currentInput += buttonText;
            display.textContent = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput) {
                if (previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                }
                previousInput = currentInput;
                currentInput = '';
                operator = buttonText;
            }
        } else {
            currentInput += buttonText;
            display.textContent = currentInput;
        }
    });
});

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (a / b).toString();
        default:
            return b;
    }
}
