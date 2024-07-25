"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOperator = exports.handleOperand = exports.stringifyStack = exports.roundToThreeDecimalPlaces = exports.standardizeString = exports.formatInputExpression = exports.isNullInput = exports.validNonOperatorStrings = exports.operators = void 0;
// all valid operators for four-function calculator
exports.operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    x: (a, b) => a * b,
    '/': (a, b) => a / b,
};
exports.validNonOperatorStrings = ['q', 'c', 'h', ' '];
/**
 * Checks if input string is empty
 * @param input - string of unknown length
 * @returns boolean denoting if input is null
 */
const isNullInput = (input) => {
    return input.length === 0;
};
exports.isNullInput = isNullInput;
/**
 * Formats the input expression to contain only valid tokens and splits it into proper integers, floats, and operators
 * @param inputExpression - string representing user input expression
 * @returns formatted array of valid tokens
 */
const formatInputExpression = (inputExpression) => {
    const splitInput = inputExpression.split('');
    let formattedInput = [];
    let tokenPlaceholder = '';
    for (let i = 0; i < splitInput.length; i++) {
        if (!isNaN(parseFloat(splitInput[i])) || splitInput[i] === '.') {
            tokenPlaceholder += splitInput[i];
            if (isNaN(parseFloat(splitInput[i + 1])) && splitInput[i + 1] !== '.') {
                if (tokenPlaceholder.match(/./g).length > 1) {
                    console.log(`Warning: Operands cannot contain more than one decimal. Only digits before the second decimal point in "${tokenPlaceholder}" will be evaluated`);
                }
                formattedInput.push(tokenPlaceholder);
                tokenPlaceholder = '';
            }
        }
        else if (splitInput[i] in exports.operators) {
            formattedInput.push(splitInput[i]);
        }
        else if (splitInput[i] in exports.validNonOperatorStrings) {
            console.log(`Warning: "${splitInput[i]}" is not a valid operator or operand. It will be ignored.`);
        }
    }
    return formattedInput;
};
exports.formatInputExpression = formatInputExpression;
/**
 * Lowercases and trims input string
 * @param inputString - raw string from user input
 * @returns standardized string ready for comparison
 */
const standardizeString = (inputString) => {
    return inputString.toLowerCase().trim();
};
exports.standardizeString = standardizeString;
/**
 * Truncates a number to three decimal places
 * @param input - float to be truncated
 * @returns truncated float
 */
const roundToThreeDecimalPlaces = (input) => {
    let roundedValue = Math.round(parseFloat(input) * 1000) / 1000;
    if (roundedValue % 1 === 0) {
        roundedValue = Math.floor(roundedValue);
    }
    return roundedValue;
};
exports.roundToThreeDecimalPlaces = roundToThreeDecimalPlaces;
/**
 * Joins stack into a string with tokens separated by whitespace
 * @param stack - array of tokens
 * @returns string of stack tokens joined with whitespace
 */
const stringifyStack = (stack) => {
    return stack.join(' ');
};
exports.stringifyStack = stringifyStack;
/**
 * truncates operants and adds them to the active stack
 * @param operand - number being added to stack
 * @param stack - active stack being evaluated
 * @returns stack with new operand truncated and pushed on
 */
const handleOperand = (operand, stack) => {
    stack.push((0, exports.roundToThreeDecimalPlaces)(operand));
    return stack;
};
exports.handleOperand = handleOperand;
/**
 * Applies the given operator to final two operands in the active stack. Throws error if there are insufficient operands
 * @param operator - string representing a valid calculator operation
 * @param stack - active stack being evaluated
 * @returns stack with new values after operator is applied
 */
const handleOperator = (operator, stack, previousStack) => {
    if (operator === '/' && stack[stack.length - 1] === 0) {
        console.log('"0" is not a valid divisor. Ignoring previous input expression and restoring previous stack.');
        return previousStack;
    }
    if (stack.length < 2) {
        console.error(`Error: Operators require 2 operands to evaluate. The problematic operator "${operator}" will be ignored \nPlease add another operand before adding another operator.`);
        return stack;
    }
    const currentOperands = [stack.pop(), stack.pop()];
    const newOperand = exports.operators[operator](currentOperands[1], currentOperands[0]);
    stack.unshift((0, exports.roundToThreeDecimalPlaces)(newOperand.toString()));
    return stack;
};
exports.handleOperator = handleOperator;
