# Reverse Polish Notation Calculator

This repo contains a CLI implementation of a reverse polish notation calculator built using Typescript.
There were several main design considerations in the development of this tool:

- **To provide as robust a level of functionality as possible to the user.**

  This goal, accomplished in the brief amount of time available to work on this tool, comes at the expense of having some large functions that could definitely be componentized and likely simplified further.

- **To consistently provide the user with a clear picture of the state of their calculation.**

  This manifests in a few ways:

  1. Providing the user with access to additional usage instructions
  2. Providing the user with the state of the stack (after every input)
  3. Providing the user with a summary of what their input expression was resolved to before evaluation (after every input)
  4. Providing the user with clear error messages and clean recoveries (after invalid inputs)

- **To provide other developers with verbose comments and annotations throughout**

  I've tried to include helpful function annotations throughout the code, as well as comments within larger functions describing the functionality of their parts. This is intended aid code readability and simplify future componentization.

## Functionality

This calculator is built to:

- calculate with input expressions and stacks of any length
- accept negative operands
- accept multi-digit operands
- accept both integer and float operands
- handle common mathematical errors (e.g. divide-by-zero, insufficient operands )
- handle improper formating of whitespace
- handle invalid characters in input expression

## Getting Up and Running

### To install

```
npm install
```

### To run

```
npm start
```

### To run tests

```
npm test
```

### To run and watch tests

```
npm run test-watch
```

## Further Questions, Considerations, and Possible Improvements

1. As the functionality has expanded to handle more edge cases and improper formatting of input expressions, the main input-handling and formatting functions have become somewhat bloated and reliant on nested conditionals in some cases and could be pieced out for readability and cleanliness, which would be a priority given more time to work on this.
2. Additionally, I think the calculatorUtils.ts file can be further broken out into separate files for calculator-specific handlers and true utility functionss (such as whitespace trimming and rounding functions)
3. As this is my first time using Typescript and Node's Readline() module, I definitely have some more to look into regarding the tech used in this repo:

   - What are best practices regarding testing Typescript files?
     - Should the tests check the .ts files or the transpiled .js files?
     - Should the tests be colocated with the files they are testing?
   - What are best practices regarding Typescript file structure?
     - Should .ts files and their transpiled .js files being colocated or not?
     - Should git track the .ts files _and_ the transpiled .js files?
   - What functionality offered by Node's Readline module is being left on the table that could be utilized here?
