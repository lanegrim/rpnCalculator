import { handleInput } from './index'

it('evaluates single-token user inputs to modify stack', () => {
	const sampleExpressionsAndResultingStacks: { [key: string]: number[] } = {
		'5': [5],
		'8': [5, 8],
		'+': [13],
		q: [],
	}

	for (const expression in sampleExpressionsAndResultingStacks) {
		expect(handleInput(expression)).toStrictEqual(
			sampleExpressionsAndResultingStacks[expression]
		)
	}
})
