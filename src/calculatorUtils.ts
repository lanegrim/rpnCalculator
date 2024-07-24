// all valid operators for four-function calculator
export const operators: { [key: string]: (a: number, b: number) => number } = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	x: (a, b) => a * b,
	'/': (a, b) => a / b,
}

/**
 * Checks if the input string is a valid calculator operator or number
 * @param token - substring of calculator input string
 * @returns boolean
 */
export const isOperatorOrOperand = (token: string): boolean => {
	return token in operators || !isNaN(parseFloat(token))
}

/**
 * Lowercases and trims input string
 * @param inputString - raw string from user input
 * @returns standardized string ready for comparison
 */
export const standardizeString = (inputString: string): string => {
	return inputString.toLocaleLowerCase().trim()
}

/**
 * Truncates a number to three decimal places
 * @param input - float to be truncated
 * @returns truncated float
 */
export const truncateToThreeDecimalPlaces = (input: number): number => {
	return parseFloat(input.toFixed(3))
}
