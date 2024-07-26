"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOperator = exports.handleOperand = exports.stringifyStack = exports.roundToThreeDecimalPlaces = exports.standardizeString = exports.formatInputExpression = exports.isNullInput = void 0;
// Valid operators for four-function calculator
const calculatorData_1 = require("./calculatorData");
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
        let tokenIsNegative = false;
        // Checks for negative integers and floats
        if (splitInput[i] === '-') {
            if (!isNaN(parseFloat(splitInput[i + 1])) || splitInput[i + 1] === '.') {
                tokenIsNegative = true;
                tokenPlaceholder += splitInput[i];
            }
        }
        // Reassembles multi-characters integers and floats from split input
        if (!isNaN(parseFloat(splitInput[i])) || splitInput[i] === '.') {
            tokenPlaceholder += splitInput[i];
            // Checks next character for continuation of current number
            if (isNaN(parseFloat(splitInput[i + 1])) && splitInput[i + 1] !== '.') {
                // If number contains multiple decimal points, prints warning and only evaluates digits before the second decimal point.
                if (tokenPlaceholder.match(/\./g) &&
                    tokenPlaceholder.match(/\./g).length > 1) {
                    console.log(`Warning: Operands cannot contain more than one decimal. Only digits before the second decimal point in "${tokenPlaceholder}" will be evaluated`);
                }
                formattedInput.push(tokenPlaceholder);
                tokenPlaceholder = '';
            }
            // Checks for valid operators from remaining characters
        }
        else if (splitInput[i] in calculatorData_1.operators) {
            // Checks that a '-' is not already being used to indicate a negative number before adding it to the formatted expression
            if (splitInput[i] !== '-') {
                formattedInput.push(splitInput[i]);
            }
            else if (tokenIsNegative === false) {
                formattedInput.push(splitInput[i]);
            }
            // Prints a warning if invalid characters are included in input string
        }
        else if (calculatorData_1.validNonOperatorStrings.indexOf(splitInput[i]) === -1) {
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
    // Checks for divide-by-zero error and reverts back to previous stack if encountered
    if (operator === '/' && stack[stack.length - 1] === 0) {
        console.log('Error: "0" is not a valid divisor. Ignoring previous input expression and restoring previous stack.');
        return previousStack;
    }
    // Checks for minimum number of operands in stack required by operator
    if (stack.length < 2) {
        console.error(`Error: Operators require 2 operands to evaluate. The problematic operator "${operator}" will be ignored \nPlease provide an additional operand before adding an operator.`);
        return stack;
    }
    // Removes and stores the top two operands from the ative stack
    const currentOperands = [stack.pop(), stack.pop()];
    // Calculates a new operand using the current operator and the stored operands, then adds new operand to active stack
    const newOperand = calculatorData_1.operators[operator](currentOperands[1], currentOperands[0]);
    stack.push((0, exports.roundToThreeDecimalPlaces)(newOperand.toString()));
    return stack;
};
exports.handleOperator = handleOperator;
