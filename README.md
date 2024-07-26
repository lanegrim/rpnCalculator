# Reverse Polish Notation Calculator

This repo contains a CLI implementation of a reverse polish notation calculator built using Typescript.
The main design considerations in the development of this tool were to provide as robust a level of functionality as possible and to consistently provide the user with a clear picture of the state of their calculation. The latter manifests in a few ways:

1. Providing users with clear usage instructions
2. Providing users with the current stack after every input
3. Providing users with a summary of what their input expression was resolved to before evaluation
4. Providing users with clear error messages and clean recoveries after invalid inputs

## Functionality

This calculator is built to:

- calculate with inputs and stacks of any length
- accept negative numbers
- accept both integers and floats
- handle common mathematical errors (e.g. divide-by-zero, insufficient operands )
- handle improper formating of whitespace
- handle invalid input characters

### To install

```
npm install
tsc
```

### To run

```
node dist/index.js
```

### To run tests

```
npm test
```

## Further Questions, Considerations, and Possible Improvements

- As the functionality has expanded to handle more edge cases and improper formatting, the main input formatting function has become somewhat bloated and needs to be pieced out for readability, which would be a priority given more time to work on this.
- Investigate best practices around testing typescript files. Should the tests check the .ts files or the transpiled .js files?
- Investigate best practices around typescript file structure with regards to .ts files and their transpiled .js files being colocated, whether to have git track the transpiled .js files, etc. etc.
