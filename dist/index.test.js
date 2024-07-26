"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('evaluates single-token user inputs to modify stack', () => {
    const sampleExpressionsAndResultingStacks = {
        '5': [5],
        '8': [5, 8],
        '+': [13],
        q: [],
    };
    for (const expression in sampleExpressionsAndResultingStacks) {
        expect((0, index_1.handleInput)(expression)).toStrictEqual(sampleExpressionsAndResultingStacks[expression]);
    }
});
