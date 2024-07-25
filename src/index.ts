import readline from 'readline'
import {
	operators,
	isOperatorOrOperand,
	truncateToThreeDecimalPlaces,
	standardizeString,
	isNullInput,
	splitOnWhiteSpace,
	stringifyStack,
} from './calculatorUtils'

let activeStack: string[] = []

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
	rl.setPrompt('Input an expression to begin:')
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

	const tokens = splitOnWhiteSpace(standardizedInput)

	tokens.forEach((token) => {
		if (isOperatorOrOperand(token)) {
			activeStack.push(token)
		}
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
