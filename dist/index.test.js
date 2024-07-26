"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('Core handleInput function', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const warnSpy = jest.spyOn(global.console, 'warn');
    const errorSpy = jest.spyOn(global.console, 'error');
    afterEach(() => {
        jest.clearAllMocks();
    });
    const inputTestingLoop = (sampleInputs, expectedStacks) => {
        for (let i = 0; i < sampleInputs.length; i++) {
            expect((0, index_1.handleInput)(sampleInputs[i])).toStrictEqual(expectedStacks[i]);
        }
    };
    it('clears the stack on "c" input', () => {
        const sampleInputs = ['c', '5', 'c', 'q'];
        const expectedStacks = [[], [5], [], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('exits on "q" input', () => {
        const sampleInputs = ['c', '5', '3', 'q'];
        const expectedStacks = [[], [5], [5, 3], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(logSpy.mock.calls).toContainEqual(['Exiting...']);
    });
    it('evaluates single-token user inputs', () => {
        const sampleInputs = ['c', '5', '8', '+', 'q'];
        const expectedStacks = [[], [5], [5, 8], [13], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('evaluates complex user inputs', () => {
        const sampleInputs = ['c', '5 5 5 8 + + -', '13 +', 'q'];
        const expectedStacks = [[], [-13], [0], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('evaluates negative numbers within user inputs', () => {
        const sampleInputs = ['c', '-3', '-2', '*', '5', '+', 'q'];
        const expectedStacks = [[], [-3], [-3, -2], [6], [6, 5], [11], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('evaluates floats within user inputs', () => {
        const sampleInputs = ['c', '5.0', '9.1', '1', '-', '-', 'q'];
        const expectedStacks = [
            [],
            [5],
            [5, 9.1],
            [5, 9.1, 1],
            [5, 8.1],
            [-3.1],
            [],
        ];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('evaluates operations that result in floats', () => {
        const sampleInputs = ['c', '5', '9', '1', '-', '/', 'q'];
        const expectedStacks = [[], [5], [5, 9], [5, 9, 1], [5, 8], [0.625], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('separates operators from other tokens when users provide no whitespace between', () => {
        const sampleInputs = ['c  ', '5 ', '9', '1-/', 'q'];
        const expectedStacks = [[], [5], [5, 9], [0.625], []];
        inputTestingLoop(sampleInputs, expectedStacks);
    });
    it('provides additional instructions on "h" input', () => {
        const sampleInputs = ['c', 'h', 'q'];
        const expectedStacks = [[], [], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(logSpy.mock.calls).toContainEqual([
            'To calculate, enter an expression using integers, floats, and valid operators.',
        ]);
    });
    it('provides feedback to users on the current state after each input', () => {
        const sampleInputs = ['c', '5', '8', '+', 'q'];
        const expectedStacks = [[], [5], [5, 8], [13], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(logSpy).toHaveBeenCalledWith(`input evaluated as: "5"`);
        expect(logSpy).toHaveBeenCalledWith(`previous stack: []  ==> current stack: [5]`);
        expect(logSpy).toHaveBeenCalledWith(`input evaluated as: "8"`);
        expect(logSpy).toHaveBeenCalledWith(`previous stack: [5]  ==> current stack: [5 8]`);
        expect(logSpy).toHaveBeenCalledWith(`input evaluated as: "+"`);
        expect(logSpy).toHaveBeenCalledWith(`previous stack: [5 8]  ==> current stack: [13]`);
    });
    it('provides feedback to users and recovers when invalid characters and whitespace are used', () => {
        const sampleInputs = ['c  ', '5fe ', '9', '1', ' d- ', '/', 'q'];
        const expectedStacks = [[], [5], [5, 9], [5, 9, 1], [5, 8], [0.625], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(warnSpy).toHaveBeenCalledWith('Warning: "f" is not a valid operator or operand. It will be ignored.');
        expect(warnSpy).toHaveBeenCalledWith('Warning: "e" is not a valid operator or operand. It will be ignored.');
        expect(warnSpy).toHaveBeenCalledWith('Warning: "d" is not a valid operator or operand. It will be ignored.');
    });
    it('provides feedback to users and recovers when a divide-by-zero error is encountered', () => {
        const sampleInputs = ['c', '5', '0', '/', 'q'];
        const expectedStacks = [[], [5], [5, 0], [5, 0], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(errorSpy).toHaveBeenCalledWith('Error: "0" is not a valid divisor. Ignoring previous input expression and restoring previous stack.');
    });
    it('provides feedback to users and recovers when an operation is attempted with insufficient operands', () => {
        const sampleInputs = ['c', '5', '+', 'q'];
        const expectedStacks = [[], [5], [5], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(errorSpy).toHaveBeenCalledWith(`Error: Operators require 2 operands to evaluate. The problematic operator "+" will be ignored \nPlease provide an additional operand before adding an operator.`);
    });
    it('provides feedback to users and recovers when an operand has multiple decimal points', () => {
        const sampleInputs = ['c', '5.0.0', '+', 'q'];
        const expectedStacks = [[], [5], [5], []];
        inputTestingLoop(sampleInputs, expectedStacks);
        expect(warnSpy).toHaveBeenCalledWith(`Warning: Operands cannot contain more than one decimal. Only digits before the second decimal point in "5.0.0" will be evaluated`);
    });
});
