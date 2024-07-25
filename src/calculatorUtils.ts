// all valid operators for four-function calculator
export const operators: { [key: string]: (a: number, b: number) => number } = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	x: (a, b) => a * b,
	'/': (a, b) => a / b,
}

export const validNonOperatorStrings: string[] = ['q', 'c', 'h', ' ']

/**
 * Checks if input string is empty
 * @param input - string of unknown length
 * @returns boolean denoting if input is null
 */
export const isNullInput = (input: string): boolean => {
	return input.length === 0
}

/**
 * Formats the input expression to contain only valid tokens and splits it into proper integers, floats, and operators
 * @param inputExpression - string representing user input expression
 * @returns formatted array of valid tokens
 */
export const formatInputExpression = (inputExpression: string): string[] => {
	const splitInput = inputExpression.split('')
	let formattedInput = []
	let tokenPlaceholder = ''
	for (let i = 0; i < splitInput.length; i++) {
		let tokenIsNegative = false
		if (splitInput[i] === '-') {
			if (!isNaN(parseFloat(splitInput[i + 1])) || splitInput[i + 1] === '.') {
				tokenIsNegative = true
				tokenPlaceholder += splitInput[i]
			}
		}

		if (!isNaN(parseFloat(splitInput[i])) || splitInput[i] === '.') {
			tokenPlaceholder += splitInput[i]

			if (isNaN(parseFloat(splitInput[i + 1])) && splitInput[i + 1] !== '.') {
				if (
					tokenPlaceholder.match(/\./g) &&
					tokenPlaceholder.match(/\./g)!.length > 1
				) {
					console.log(
						`Warning: Operands cannot contain more than one decimal. Only digits before the second decimal point in "${tokenPlaceholder}" will be evaluated`
					)
				}
				formattedInput.push(tokenPlaceholder)
				tokenPlaceholder = ''
			}
		} else if (splitInput[i] in operators) {
			if (splitInput[i] !== '-') {
				formattedInput.push(splitInput[i])
			} else if (tokenIsNegative === false) {
				formattedInput.push(splitInput[i])
			}
		} else if (splitInput[i]! in validNonOperatorStrings) {
			console.log(
				`Warning: "${splitInput[i]}" is not a valid operator or operand. It will be ignored.`
			)
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
export const handleOperator = (
	operator: string,
	stack: number[],
	previousStack: number[]
): number[] => {
	if (operator === '/' && stack[stack.length - 1] === 0) {
		console.log(
			'Error: "0" is not a valid divisor. Ignoring previous input expression and restoring previous stack.'
		)
		return previousStack
	}

	if (stack.length < 2) {
		console.error(
			`Error: Operators require 2 operands to evaluate. The problematic operator "${operator}" will be ignored \nPlease add another operand before adding another operator.`
		)
		return stack
	}

	const currentOperands = [stack.pop()!, stack.pop()!]

	const newOperand = operators[operator](currentOperands[1], currentOperands[0])
	stack.push(roundToThreeDecimalPlaces(newOperand.toString()))

	return stack
}
