import { handleInput } from './index'

it('evaluates single-token user inputs to modify stack', () => {
	const sampleInputs = ['c', '5', '8', '+', 'q']
	const expectedStacks = [[], [5], [5, 8], [13], []]

	for (let i = 0; i < sampleInputs.length; i++) {
		expect(handleInput(sampleInputs[i])).toStrictEqual(expectedStacks[i])
	}
})

it('evaluates complex user inputs to modify stack', () => {
	const sampleInputs = ['c', '5 5 5 8 + + -', '13 +', 'q']
	const expectedStacks = [[], [-13], [0], []]

	for (let i = 0; i < sampleInputs.length; i++) {
		expect(handleInput(sampleInputs[i])).toStrictEqual(expectedStacks[i])
	}
})

it('evaluates negative numbers within user inputs to modify stack', () => {
	const sampleInputs = ['c', '-3', '-2', '*', '5', '+', 'q']
	const expectedStacks = [[], [-3], [-3, -2], [6], [6, 5], [11], []]

	for (let i = 0; i < sampleInputs.length; i++) {
		expect(handleInput(sampleInputs[i])).toStrictEqual(expectedStacks[i])
	}
})
