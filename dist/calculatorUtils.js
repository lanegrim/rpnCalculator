"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyStack = exports.truncateToThreeDecimalPlaces = exports.standardizeString = exports.isOperatorOrOperand = exports.splitOnWhiteSpace = exports.isNullInput = exports.operators = void 0;
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
/**
 * Transforms an expression into an array of token
 * @param expression - a string comprised of tokens and whitespace
 * @returns array of token strings
 */
const splitOnWhiteSpace = (expression) => {
    return expression.trim().split(/\s+/);
};
exports.splitOnWhiteSpace = splitOnWhiteSpace;
/**
 * Checks if the input string is a valid calculator operator or number
 * @param token - substring of calculator input string
 * @returns boolean denoting validity of token
 */
const isOperatorOrOperand = (token) => {
    return token in exports.operators || !isNaN(parseFloat(token));
};
exports.isOperatorOrOperand = isOperatorOrOperand;
/**
 * Lowercases and trims input string
 * @param inputString - raw string from user input
 * @returns standardized string ready for comparison
 */
const standardizeString = (inputString) => {
    return inputString.toLocaleLowerCase().trim();
};
exports.standardizeString = standardizeString;
/**
 * Truncates a number to three decimal places
 * @param input - float to be truncated
 * @returns truncated float
 */
const truncateToThreeDecimalPlaces = (input) => {
    return parseFloat(input.toFixed(3));
};
exports.truncateToThreeDecimalPlaces = truncateToThreeDecimalPlaces;
/**
 * Joins stack into a string with tokens separated by whitespace
 * @param stack - array of tokens
 * @returns string of stack tokens joined with whitespace
 */
const stringifyStack = (stack) => {
    return stack.join(' ');
};
exports.stringifyStack = stringifyStack;
