# Reverse Polish Notation Calculator

## Description

This repo contains a CLI implementation of a reverse polish notation calculator built using Typescript.
The main design consideration in the development of this tool to consistently provide the user with a clear picture of the state of their calculation. This manifests in a few ways:

1. Providing users with clear usage instructions
2. Providing users with the current stack after every input
3. Providing users with a summary of what their input expression was resolved to before evaluation
4. Providing users with clear error messages and clean recoveries after invalid inputs

## Further Questions, Considerations, and Possible Improvements

- Investigate best practices around testing typescript files. Should the tests check the .ts files or the transpiled .js files?
- Investigate best practices around typescript file structure with regards to .ts files and their transpiled .js files being colocated, whether to have git track the transpiled .js files, etc. etc.
- As the functionality has expanded to handle more edge cases and improper formatting, some of the functions involved have gotten bloated and need to be pieced out for readability
