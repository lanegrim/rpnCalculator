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

/**
 * Transforms an expression into an array of token
 * @param expression - a string comprised of tokens and whitespace
 * @returns array of token strings
 */
export const splitOnWhiteSpace = (expression: string): string[] => {
	return expression.trim().split(/\s+/)
}

/**
 * Checks if the input string is a valid calculator operator or number
 * @param token - substring of calculator input string
 * @returns boolean denoting validity of token
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

/**
 * Joins stack into a string with tokens separated by whitespace
 * @param stack - array of tokens
 * @returns string of stack tokens joined with whitespace
 */
export const stringifyStack = (stack: string[]): string => {
	return stack.join(' ')
}
