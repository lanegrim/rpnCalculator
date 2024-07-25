"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
let activeStack;
let lastInput;
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const promptForInitialInput = () => {
    rl.write('Reverse Polish Notation Calculator \n');
    rl.write('To solve, please format expressions with operands preceding operators and single spaces between each \n');
    rl.write('Ex: "6 4 3 + -" will evaluate to "-1" \n');
    rl.write('Press q or ctl+c to exit \n');
    rl.setPrompt('Input an expression to begin: \n');
    rl.prompt();
};
const handleInput = () => { };
promptForInitialInput();
