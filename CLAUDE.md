# CLAUDE.md - Guidelines for the sample-pgjwt repository

## Build & Run Commands
- Auth Server: `cd auth-server && pnpm dev` (build and run)
- Frontend: `cd frontend && pnpm dev` (run Vite dev server)
- Full Stack: `docker-compose up` (run all services)

## Test Commands
- Auth Server: `cd auth-server && pnpm test` (run all tests)
- Auth Server Watch: `cd auth-server && pnpm test:watch` (run tests in watch mode)
- Frontend: `cd frontend && pnpm test` (run all tests)
- Frontend Watch: `cd frontend && pnpm test:watch` (run tests in watch mode)
- Single Test: `cd [auth-server|frontend] && pnpm test -t "test name"` (run specific test)

## Lint Commands
- Frontend: `cd frontend && pnpm lint` (ESLint)

## Code Style Guidelines
- TypeScript: Use strict mode with explicit return types
- React: Use functional components with hooks
- Imports: External modules first, then internal modules
- Naming: camelCase for variables/functions, PascalCase for components
- Error handling: try/catch with Express next(err) pattern in backend
- Robust error handling: Always include try/catch for async operations
- CSS: Tailwind utility classes for styling
- SQL: Uppercase keywords, lowercase identifiers

## Testing Conventions
- Unit tests in same directory as source files (*.test.ts/tsx)
- Use jest.mock() for external dependencies
- Frontend: Use @testing-library/react and userEvent for testing components
- Backend: Use supertest for API endpoint testing

## Project Structure
- Monorepo with auth-server, frontend, and db services
- Docker-based development environment
- pnpm package manager preferred