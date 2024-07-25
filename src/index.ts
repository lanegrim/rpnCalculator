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
	console.log('Press c to clear stack')
	console.log('Press q or ctl+c to exit')
	rl.setPrompt('Input an expression:')
	rl.prompt()
}

const handleInput = (input: string): void => {
	let previousStack: number[] = [...activeStack]
	let standardizedInput = standardizeString(input)

	if (isNullInput(standardizedInput)) {
		console.log(`current stack: [${stringifyStack(activeStack)}]`)
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

	const tokens = formatInputExpression(standardizedInput)

	tokens.forEach((token) => {
		token in operators
			? (activeStack = handleOperator(token, activeStack))
			: (activeStack = handleOperand(token, activeStack))
	})

	console.log(
		`previous stack: [${stringifyStack(
			previousStack
		)}]  ==> current stack: [${stringifyStack(activeStack)}]`
	)
}

rl.on('line', (input: string): void => {
	rl.setPrompt('->')
	rl.prompt()
	handleInput(input)
})

if (require.main === module) {
	promptForInitialInput()
}
