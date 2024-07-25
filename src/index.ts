import readline from 'readline'
import {
	operators,
	isOperatorOrOperand,
	truncateToThreeDecimalPlaces,
	standardizeString,
} from './calculatorUtils'

let activeStack: []
let lastInput: string

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const promptForInitialInput = (): void => {
	rl.write('Reverse Polish Notation Calculator \n')
	rl.write(
		'To solve, please format expressions with operands preceding operators and single spaces between each \n'
	)
	rl.write('Ex: "6 4 3 + -" will evaluate to "-1" \n')
	rl.write('Press q or ctl+c to exit \n')
	rl.setPrompt('Input an expression to begin: \n')
	rl.prompt()
}

const handleInput = () => {}

promptForInitialInput()
