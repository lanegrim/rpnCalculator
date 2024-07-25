"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOperator = exports.handleOperand = exports.stringifyStack = exports.roundToThreeDecimalPlaces = exports.standardizeString = exports.formatInputExpression = exports.isNullInput = exports.operators = void 0;
// all valid operators for four-function calculator
exports.operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    x: (a, b) => a * b,
    '/': (a, b) => a / b,
};
/**
 * Checks if input string is empty
 * @param input - string of unknown length
 * @returns boolean denoting if input is null
 */
const isNullInput = (input) => {
    return input.length === 0;
};
exports.isNullInput = isNullInput;
const formatInputExpression = (inputExpression) => {
    const splitInput = inputExpression.split('');
    let formattedInput = [];
    let tokenPlaceholder = '';
    for (let i = 0; i < splitInput.length; i++) {
        if (!isNaN(parseFloat(splitInput[i])) || splitInput[i] === '.') {
            tokenPlaceholder += splitInput[i];
            if (isNaN(parseFloat(splitInput[i + 1])) && splitInput[i + 1] !== '.') {
                formattedInput.push(tokenPlaceholder);
                tokenPlaceholder = '';
            }
        }
        if (splitInput[i] in exports.operators) {
            formattedInput.push(splitInput[i]);
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
const handleOperator = (operator, stack) => {
    if (stack.length < 2) {
        console.error(`Error: Operators require 2 operands to evaluate. Removing the problematic operator (${operator}) \nPlease add another operand before adding another operator.`);
        return stack;
    }
    const currentOperands = [stack.pop(), stack.pop()];
    const newOperand = exports.operators[operator](currentOperands[1], currentOperands[0]);
    stack.unshift(newOperand);
    return stack;
};
exports.handleOperator = handleOperator;
