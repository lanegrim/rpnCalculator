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
	console.log(
		'To solve, please format expressions with operands preceding operators and single spaces between each'
	)
	console.log('Ex: "6 4 3 + -" will evaluate to "-1"')
	console.log('Press c to clear stack')
	console.log('Press q or ctl+c to exit')
	rl.setPrompt('Input an expression:')
	rl.prompt()
}

const handleInput = (input: string): void => {
	const standardizedInput = standardizeString(input)

	if (isNullInput(standardizedInput)) {
		console.log(
			`input: ${input} ==> current stack: [${stringifyStack(activeStack)}]`
		)
		return
	}

	if (standardizedInput === 'q') {
		rl.close()
		return
	}

	if (standardizedInput === 'c') {
		activeStack = []
	}

	const tokens = formatInputExpression(standardizedInput)

	tokens.forEach((token) => {
		token in operators
			? (activeStack = handleOperator(token, activeStack))
			: (activeStack = handleOperand(token, activeStack))
	})

	console.log(
		`input: ${input}  ==> current stack: [${stringifyStack(activeStack)}]`
	)
}

rl.on('line', (input: string): void => {
	handleInput(input)
})

if (require.main === module) {
	promptForInitialInput()
}
