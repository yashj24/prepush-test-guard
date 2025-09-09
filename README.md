# prepush-test-guard

A TypeScript npm package for git pre-push checks.

## Features
- Detects staged files
- Runs ESLint auto-fix on changed TypeScript files
- Warns if changed source files have or lack corresponding tests
- Does not block commits unless lint fails

## Usage
- Add as a dev dependency
- Use with Husky pre-push hook

## Example Functions
- `add(a, b)`
- `subtract(a, b)`
- `capitalizeString(str)`

## Project Structure
```
prepush-test-guard/
├── src/
│   ├── add.ts
│   ├── subtract.ts
│   ├── capitalizeString.ts
│   └── check.ts
├── tests/
│   ├── add.test.ts
│   └── capitalizeString.test.ts
├── package.json
├── tsconfig.json
└── README.md
```
