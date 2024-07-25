"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateToThreeDecimalPlaces = exports.standardizeString = exports.isOperatorOrOperand = exports.operators = void 0;
// all valid operators for four-function calculator
exports.operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    x: (a, b) => a * b,
    '/': (a, b) => a / b,
};
/**
 * Checks if the input string is a valid calculator operator or number
 * @param token - substring of calculator input string
 * @returns boolean
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
