import readline from 'readline'
import {
	operators,
	standardizeString,
	isNullInput,
	stringifyStack,
	handleOperand,
	handleOperator,
	formatInputExpression,
} from './calculatorUtils'

let activeStack: number[] = []

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const promptForInitialInput = (): void => {
	console.log('Reverse Polish Notation Calculator')
	console.log('Enter c to clear stack')
	console.log('Enter q or ctl+c to exit')
	console.log('Enter h for more info')
	rl.setPrompt('Input an expression to begin: ')
	rl.prompt()
}

const handleInput = (input: string): void => {
	let previousStack: number[] = [...activeStack]
	let standardizedInput = standardizeString(input)

	if (isNullInput(standardizedInput)) {
		console.log(
			`previous stack: [${stringifyStack(
				previousStack
			)}]  ==> current stack: [${stringifyStack(activeStack)}]`
		)
		return
	}

	if (standardizedInput === 'q') {
		console.log('Exiting...')
		rl.close()
		return
	}

	if (standardizedInput === 'c') {
		activeStack = []
		standardizedInput = ''
	}

	if (standardizedInput === 'h') {
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

	const tokens = formatInputExpression(standardizedInput)

	tokens.forEach((token) => {
		token in operators
			? (activeStack = handleOperator(token, activeStack, previousStack))
			: (activeStack = handleOperand(token, activeStack))
	})

	console.log(`input evaluated as: "${tokens.join(' ')}"`)
	console.log(
		`previous stack: [${stringifyStack(
			previousStack
		)}]  ==> current stack: [${stringifyStack(activeStack)}]`
	)
}

rl.on('line', (input: string): void => {
	rl.setPrompt('')
	rl.prompt()
	handleInput(input)
})

if (require.main === module) {
	promptForInitialInput()
}
