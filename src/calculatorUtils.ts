// all valid operators for four-function calculator
export const operators: { [key: string]: (a: number, b: number) => number } = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	x: (a, b) => a * b,
	'/': (a, b) => a / b,
}

/**
 * Checks if input string is empty
 * @param input - string of unknown length
 * @returns boolean denoting if input is null
 */
export const isNullInput = (input: string): boolean => {
	return input.length === 0
}

export const formatInputExpression = (inputExpression: string) => {
	const splitInput = inputExpression.split('')
	let formattedInput = []
	let tokenPlaceholder = ''
	for (let i = 0; i < splitInput.length; i++) {
		if (!isNaN(parseFloat(splitInput[i])) || splitInput[i] === '.') {
			tokenPlaceholder += splitInput[i]

			if (isNaN(parseFloat(splitInput[i + 1])) && splitInput[i + 1] !== '.') {
				formattedInput.push(tokenPlaceholder)
				tokenPlaceholder = ''
			}
		}

		if (splitInput[i] in operators) {
			formattedInput.push(splitInput[i])
		}
	}

	return formattedInput
}

/**
 * Lowercases and trims input string
 * @param inputString - raw string from user input
 * @returns standardized string ready for comparison
 */
export const standardizeString = (inputString: string): string => {
	return inputString.toLowerCase().trim()
}

/**
 * Truncates a number to three decimal places
 * @param input - float to be truncated
 * @returns truncated float
 */
export const roundToThreeDecimalPlaces = (input: string): number => {
	let roundedValue = Math.round(parseFloat(input) * 1000) / 1000
	if (roundedValue % 1 === 0) {
		roundedValue = Math.floor(roundedValue)
	}
	return roundedValue
}

/**
 * Joins stack into a string with tokens separated by whitespace
 * @param stack - array of tokens
 * @returns string of stack tokens joined with whitespace
 */
export const stringifyStack = (stack: (string | number)[]): string => {
	return stack.join(' ')
}

/**
 * truncates operants and adds them to the active stack
 * @param operand - number being added to stack
 * @param stack - active stack being evaluated
 * @returns stack with new operand truncated and pushed on
 */
export const handleOperand = (operand: string, stack: number[]): number[] => {
	stack.push(roundToThreeDecimalPlaces(operand))
	return stack
}

/**
 * Applies the given operator to final two operands in the active stack. Throws error if there are insufficient operands
 * @param operator - string representing a valid calculator operation
 * @param stack - active stack being evaluated
 * @returns stack with new values after operator is applied
 */
export const handleOperator = (operator: string, stack: number[]): number[] => {
	if (stack.length < 2) {
		console.error(
			`Error: Operators require 2 operands to evaluate. Removing the problematic operator (${operator}) \nPlease add another operand before adding another operator.`
		)
		return stack
	}

	const currentOperands = [stack.pop()!, stack.pop()!]
	const newOperand = operators[operator](currentOperands[1], currentOperands[0])
	stack.unshift(newOperand)

	return stack
}
