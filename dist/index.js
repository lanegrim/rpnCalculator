"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const calculatorUtils_1 = require("./calculatorUtils");
let activeStack = [];
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const promptForInitialInput = () => {
    console.log('Reverse Polish Notation Calculator');
    console.log('Enter c to clear stack');
    console.log('Enter q or ctl+c to exit');
    console.log('Enter h for more info');
    rl.setPrompt('Input an expression to begin: ');
    rl.prompt();
};
const handleInput = (input) => {
    let previousStack = [...activeStack];
    let standardizedInput = (0, calculatorUtils_1.standardizeString)(input);
    if ((0, calculatorUtils_1.isNullInput)(standardizedInput)) {
        console.log(`previous stack: [${(0, calculatorUtils_1.stringifyStack)(previousStack)}]  ==> current stack: [${(0, calculatorUtils_1.stringifyStack)(activeStack)}]`);
        return;
    }
    if (standardizedInput === 'q') {
        console.log('Exiting...');
        rl.close();
        return;
    }
    if (standardizedInput === 'c') {
        activeStack = [];
        standardizedInput = '';
    }
    if (standardizedInput === 'h') {
        console.log('To calculate, enter an expression using integers, floats, and valid operators.');
        console.log('Valid operators:');
        console.log(' addition: "+"');
        console.log(' subtraction: "-"');
        console.log(' multiplication: "*" or "x"');
        console.log(' division: "/"');
        console.log('Operands will be processed as a stack, in first-in/last-out order');
        console.log('Ex: "3 4 1 + *" will be evaluated as: "3 * (4+1)"');
        console.log('Enter q or ctl+c to exit');
    }
    const tokens = (0, calculatorUtils_1.formatInputExpression)(standardizedInput);
    tokens.forEach((token) => {
        token in calculatorUtils_1.operators
            ? (activeStack = (0, calculatorUtils_1.handleOperator)(token, activeStack, previousStack))
            : (activeStack = (0, calculatorUtils_1.handleOperand)(token, activeStack));
    });
    console.log(`previous stack: [${(0, calculatorUtils_1.stringifyStack)(previousStack)}]  ==> current stack: [${(0, calculatorUtils_1.stringifyStack)(activeStack)}]`);
};
rl.on('line', (input) => {
    rl.setPrompt('');
    rl.prompt();
    handleInput(input);
});
if (require.main === module) {
    promptForInitialInput();
}
