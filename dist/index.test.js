"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// it('evaluates single-token user inputs to modify stack', () => {
// 	const sampleExpressionsAndResultingStacks: { [key: string]: number[] } = {
// 		'5': [5],
// 		'8': [5, 8],
// 		'+': [13],
// 		q: [],
// 	}
// 	for (const expression in sampleExpressionsAndResultingStacks) {
// 		expect(handleInput(expression)).toStrictEqual(
// 			sampleExpressionsAndResultingStacks[expression]
// 		)
// 	}
// })
// it('evaluates complex user inputs to modify stack', () => {
// 	const sampleExpressionsAndResultingStacks: { [key: string]: number[] } = {
// 		c: [],
// 		'5 5 5 8 + + -': [-13],
// 		'13 +': [0],
// 		q: [],
// 	}
// 	for (const expression in sampleExpressionsAndResultingStacks) {
// 		expect(handleInput(expression)).toStrictEqual(
// 			sampleExpressionsAndResultingStacks[expression]
// 		)
// 	}
// })
it('evaluates negative numbers within user inputs to modify stack', () => {
    const sampleExpressionsAndResultingStacks = {
        c: [],
        '-3': [-3],
        '-2': [-3, -2],
        '*': [6],
        // '5': [6, 5],
        '5 +': [11],
        q: [],
    };
    for (const expression in sampleExpressionsAndResultingStacks) {
        expect((0, index_1.handleInput)(expression)).toStrictEqual(sampleExpressionsAndResultingStacks[expression]);
    }
});
