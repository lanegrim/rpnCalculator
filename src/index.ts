import readline from 'readline'
import {
	standardizeString,
	isNullInput,
	stringifyStack,
	handleOperand,
	handleOperator,
	formatInputExpression,
} from './calculatorUtils'
import { operators } from './calculatorData'

let activeStack: number[] = []

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

/**
 * Prints initial instructional text on start
 * @returns void
 */
const promptForInitialInput = (): void => {
	console.log('Reverse Polish Notation Calculator')
	console.log('Enter c to clear stack')
	console.log('Enter q or ctl+c to exit')
	console.log('Enter h for more info')
	rl.setPrompt('Input an expression to begin: ')
	rl.prompt()
}

const provideHelpText = (): void => {
	console.log(
		'To calculate, enter an expression using integers, floats, and valid operators.'
	)
	console.log('Valid operators:')
	console.log(' addition: "+"')
	console.log(' subtraction: "-"')
	console.log(' multiplication: "*" or "x"')
	console.log(' division: "/"')
	console.log(
		'Operands will be processed as a stack, in first-in/last-out order'
	)
	console.log('Ex: "3 4 1 + *" will be evaluated as: "3 * (4+1)"')
	console.log('Enter q or ctl+c to exit')
}

/**
 *
 * @param userInput - input string passed from CLI via readline interface
 * @returns void
 */
export const handleInput = (userInput: string): number[] => {
	let previousStack: number[] = [...activeStack]
	let standardizedInput = standardizeString(userInput)

	// On null input, prints previous and current stacks without altering them
	if (isNullInput(standardizedInput)) {
		console.log(
			`previous stack: [${stringifyStack(
				previousStack
			)}]  ==> current stack: [${stringifyStack(activeStack)}]`
		)
		return activeStack
	}

	// On 'q' input, exits
	if (standardizedInput === 'q') {
		console.log('Exiting...')
		rl.close()
		return []
	}

	// On 'c' input, clears current stack
	if (standardizedInput === 'c') {
		activeStack = []
		standardizedInput = ''
		return activeStack
	}

	// On 'h' input, prints help text
	if (standardizedInput === 'h') {
		provideHelpText()
	}

	const tokens = formatInputExpression(standardizedInput)
	// Iterates over formatted user input and passes operators and operands to handlers individually
	tokens.forEach((token) => {
		token in operators
			? (activeStack = handleOperator(token, activeStack, previousStack))
			: (activeStack = handleOperand(token, activeStack))
	})

	// Prints the formatted input, as well as the active and previous stacks
	console.log(`input evaluated as: "${tokens.join(' ')}"`)
	console.log(
		`previous stack: [${stringifyStack(
			previousStack
		)}]  ==> current stack: [${stringifyStack(activeStack)}]`
	)

	return activeStack
}

// passes user input from CLI to input handler fn
rl.on('line', (input: string): void => {
	rl.setPrompt('>')
	handleInput(input)
	rl.prompt()
})

// ensures module is run directly
if (require.main === module) {
	promptForInitialInput()
}
