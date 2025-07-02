# 📄 vanilla-documents
## 🚀 Project Objective
This project is a frontend test where the goal is to implement an application to manage documents, with real-time notifications and various modern features. The premise was to use vanilla JavaScript as much as possible, adding only packages to improve development, quality, and testing.

## 🧑‍💻 Technical Decisions
- *Vanilla JS + TS*: Simplicity and clarity were prioritized, avoiding heavy frameworks. TypeScript was used for safety and maintainability.
- *Modular structure*: Components and containers are separated to facilitate scalability and reusability.
- *Thorough testing*: Modern tools were added to ensure code quality and app robustness.
- *Local continuous integration*: Using Husky and scripts to ensure everything passes formatting, linting, type checks, and tests before committing.

## 📦 Installed Packages

### 🔧 Development
- `vite`: Ultra-fast bundler for dev and build.
- `typescript`: Static typing.
- `eslint`, `eslint-config-prettier`, `typescript-eslint`: Linting and formatting.
- `prettier`: Code formatter.
- `husky`: Git hooks to ensure quality before committing.

### 🧪 Testing
- `vitest`: Unit and component testing, compatible with Jest API.
- `jsdom`: DOM simulation for tests.
- `@playwright/test`, `playwright`: Cross-platform E2E testing.

### 🛠️ Others
- `storybook`: Visual documentation and isolated component development.

## 🏗️ Useful Scripts
```bash
pnpm install           # Install dependencies
pnpm run dev           # Start the frontend (Vite)
pnpm run server        # Start the backend (Go)
pnpm run storybook     # Storybook for components
pnpm run test          # Unit tests (Vitest)
pnpm run e2e           # E2E tests (Playwright)
```

## ✨ Implemented Features
- Lazy loading (DocumentForm)
- Error boundaries
- Offline mode
- Dark theme
- Real-time notifications via WebSocket
- Scalable and modular structure
- Unit and E2E testing
- CI with Github Actions
- Design system

## 🤔 Decision Rationale
- *Simplicity*: Vanilla JS/TS allows for easily understanding the flow and logic without a framework hiding complexity.
- *Scalability*: The modular structure and use of components make it easy to add new features.
- *Quality*: Automatic linting, formatting, and testing ensure clean and robust code.
- *Developer experience*: Vite and Storybook make development fast and visual.

## 🧪 Testing and Quality
- *Unit tests*: `vitest`
- *E2E tests*: `playwright`
- *Lint/Format*: `eslint`, `prettier`
- *Pre-commit*: `husky` runs format, lint, type checks, and tests before each commit.

## 📝 Running the App
1. Clone the repo
2. `pnpm install`
3. `pnpm run dev` (frontend) and `pnpm run server` (backend)
4. `pnpm run test` and `pnpm run e2e` to run tests

## 🌑 Dark Mode and Offline
- Dark mode can be toggled from the UI.
- The app works in offline mode by default if the connection is lost.

## 📚 Storybook
- Run `pnpm run storybook` to view and test components in isolation.

## 💡 Conclusions
This project demonstrates that it is possible to build a modern, robust, and scalable application using vanilla JS/TS and a minimal yet powerful selection of development and testing tools.