import readline from 'readline'
import {
	operators,
	isOperatorOrOperand,
	truncateToThreeDecimalPlaces,
	standardizeString,
} from './calculatorUtils'

const rpnCalculator = () => {
	let activeStack = []

	readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
}
