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
    console.log('To solve, please format expressions with operands preceding operators and single spaces between each');
    console.log('Ex: "6 4 3 + -" will evaluate to "-1"');
    console.log('Press c to clear stack');
    console.log('Press q or ctl+c to exit');
    rl.setPrompt('Input an expression to begin:');
    rl.prompt();
};
const handleInput = (input) => {
    const standardizedInput = (0, calculatorUtils_1.standardizeString)(input);
    if ((0, calculatorUtils_1.isNullInput)(standardizedInput)) {
        console.log(`input: ${input} ==> current stack: [${(0, calculatorUtils_1.stringifyStack)(activeStack)}]`);
        return;
    }
    if (standardizedInput === 'q') {
        rl.close();
        return;
    }
    if (standardizedInput === 'c') {
        activeStack = [];
    }
    const tokens = (0, calculatorUtils_1.splitOnWhiteSpace)(standardizedInput);
    tokens.forEach((token) => {
        if ((0, calculatorUtils_1.isOperatorOrOperand)(token)) {
            token in calculatorUtils_1.operators
                ? (activeStack = (0, calculatorUtils_1.handleOperator)(token, activeStack))
                : (activeStack = (0, calculatorUtils_1.handleOperand)(token, activeStack));
        }
    });
    console.log(`input: ${input}  ==> current stack: [${(0, calculatorUtils_1.stringifyStack)(activeStack)}]`);
};
rl.on('line', (input) => {
    handleInput(input);
});
if (require.main === module) {
    promptForInitialInput();
}
