# Candidate Tracker

Done as part of a coding assignment

Bootstrapped using my personal [Reactivite](https://github.com/armanatz/Reactivite) (React + Vite) template.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Docs](/docs/)
  - [Design Decisions](/docs/DESIGN_DECISIONS.md)
  - [Wish List](/docs/WISHLIST.md)

## Getting Started

1. Navigate to the project folder and install dependencies:

```
// If using NPM as your package manager
npm i

// If using Yarn as your package manager
yarn
```

2. Make a copy of the `.env.example` file in the project root and rename it to `.env.local`. Then fill out the following environment variables with the correct information:

```
VITE_API_PROTO= http | https
VITE_API_DOMAIN= {THE FULLY QUALIFIED DOMAIN NAME OF THE API}
VITE_API_ENDPOINT= {IF THERE IS AN ENDPOINT LIKE /api}
```

3. Then you can run the local development server using:

```
// If using NPM as your package manager
npm run dev

// If using Yarn as your package manager
yarn dev
```

---

To build the application, run:

```
// If using NPM as your package manager
npm run build

// If using Yarn as your package manager
yarn build
```

Build files will be located in the `dist` folder once generated.

## Project Structure
```
.husky
.vscode
docs
public
src/
├── @types                        // All globally accessible types
├── assets/
│   └── styles                    // Global stylesheets
├── components/
│   ├── CandidateInfo
│   ├── DS/                       // Custom Design System components
│   │   ├── Card
│   │   ├── FormControl
│   │   ├── Input
│   │   ├── Popover
│   │   ├── Select
│   │   └── ToggleGroup
│   ├── ErrorBoundary
│   ├── FullPageLoader
│   ├── Home/
│   │   └── ActionArea
│   └── Layout
├── contexts
├── hooks/
│   └── queries                   // Abstracted useQuery hooks
├── pages/
│   ├── Home
│   └── NotFound
└── utils/                        // Utility functions
    └── __tests__
```

## Available Scripts

- `format`: Formats all files with Prettier.
- `lint`: Type-checks all files with TypeScript, and then lints all files using ESLint and StyleLint.
- `preview`: Allows for a local preview of the production build of the application.
- `test`: Runs unit and integration tests based on file changes tracked in git using Vitest.
- `test:ci`: Runs all unit and integration tests in CI mode using Vitest.
- `test:watch`: Runs Vitest test runner in watch mode.
- `validate`: Runs all linting commands defined in `lint`, and then runs `test:ci` for testing.
