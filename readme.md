TODO: migrate to turborepo (if possible? gotta learn it)

# 🚀 Full Stack Project with PostgreSQL + pgjwt + TypeScript + React + Docker + Turbo + pnpm

This is a **modern full-stack project** that combines:

✅ **Backend:** TypeScript + Express + pgjwt for JWT authentication  
✅ **Frontend:** React + Vite + Tailwind for a fast, modern UI  
✅ **Database:** PostgreSQL + pgjwt for token signing  
✅ **Monorepo:** Managed with Turbo and pnpm for caching and fast builds  
✅ **Docker:** Containerized environment for consistent local development  
✅ **Auth:** Secure JWT-based authentication  

## 🎯 **Purpose of the Project**
This project provides a robust and scalable template for building a **full-stack web application** with a clean, repeatable setup.

### ✅ **Core Features:**
- JWT-based authentication (using pgjwt)  
- Monorepo setup with Turbo and pnpm  
- PostgreSQL + pgcrypto for hashing and signing  
- React frontend with Tailwind styling  
- Docker Compose for consistent local development  
- Fast builds using Turbo caching and pnpm's virtual store  
- Comprehensive Jest-based testing suite for both frontend and backend
- Modern React Testing Library for component testing

## 🏗️ **Project Structure**
```plaintext
project/
├── auth-server/            # Backend service (Express + TypeScript)
│   ├── src/               # Source code
│   │   ├── index.ts       # Main entry point
│   │   └── index.test.ts  # API tests
│   ├── Dockerfile         # Service-specific Docker config
│   ├── jest.config.js     # Jest configuration
│   └── tsconfig.json      # TypeScript configuration
├── frontend/              # Frontend service (React + Vite)
│   ├── src/              # Source code
│   │   └── pages/        # React components
│   ├── Dockerfile        # Service-specific Docker config
│   ├── jest.config.js    # Jest configuration
│   └── tsconfig.json     # TypeScript configuration
├── db/                    # Database setup (Postgres + pgjwt)
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # PNPM workspace config
├── package.json          # Root package.json for workspace
├── docker-compose.yml    # Docker orchestration
├── .env                  # Local environment configuration
└── .gitignore
```

## 🛠️ **Setup Instructions**

### ✅ 1. Prerequisites
- Node.js 20 or later
- pnpm (`npm install -g pnpm`)
- Docker and Docker Compose

### ✅ 2. Clone and Install
```sh
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
pnpm install
```

### ✅ 3. Environment Setup
Create `.env` files:

**Root .env:**
```sh
# Shared environment variables
NODE_ENV=development
```

**auth-server/.env:**
```sh
DATABASE_URL=postgresql://postgres:postgres@db:5432/authdb
JWT_SECRET=your-secret-key
PORT=4000
```

**frontend/.env:**
```sh
VITE_API_BASE_URL=http://localhost:4000
```

### ✅ 4. Development

**Using Docker (recommended):**
```sh
# Start all services
docker compose up --build

# Start specific service
docker compose up --build auth-server
```

**Local Development:**
```sh
# Start all services
pnpm dev

# Start specific service
pnpm --filter auth-server dev
pnpm --filter frontend dev
```

### ✅ 5. Build
```sh
# Build all packages
pnpm build

# Build specific package
pnpm --filter auth-server build
```

### ✅ 6. Test
```sh
# Test all packages
pnpm test

# Test specific package
pnpm --filter auth-server test
```

## 🚀 Turborepo Features

### Cache Management
Turbo caches build outputs for faster subsequent builds:
```sh
# Clear Turbo's cache
pnpm turbo clean

# Build with remote caching (if configured)
pnpm build --remote-only
```

### Workspace Scripts
Common scripts available in the root:
- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm test` - Run tests
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean build outputs

### Dependencies
- Adding dependencies:
  ```sh
  # Add to specific package
  pnpm --filter auth-server add express

  # Add to all packages
  pnpm add -w typescript
  ```

## 🐳 Docker Configuration

Each service has its own Dockerfile optimized for the monorepo structure:

### Build Process
1. Copies workspace configuration (pnpm-workspace.yaml, package.json)
2. Installs dependencies using pnpm
3. Builds the service using Turbo
4. Creates optimized production image

### Running Services
```sh
# Start all services
docker compose up --build

# Start specific service
docker compose up --build auth-server

# Reset everything
docker compose down -v
docker compose up --build
```

## 🔧 Common Issues

### ❌ Module Resolution Errors
If you see module not found errors:
```sh
# Clean all caches and node_modules
pnpm clean

# Reinstall dependencies
pnpm install
```

### ❌ Docker Build Issues
If Docker builds fail:
```sh
# Remove all containers and volumes
docker compose down -v

# Rebuild with clean cache
docker compose build --no-cache
```

### ❌ Database Issues
If database connections fail:
```sh
# Check database logs
docker compose logs db

# Reset database
docker compose down -v
docker compose up db
```

## 🌍 **Usage**

### 🔹 Login Endpoint
Use curl to test the login endpoint:

```sh
curl -X POST http://localhost:4000/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "test123"}'
```

👉 Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 🔹 Protected Dashboard Endpoint
Use the token to access the dashboard:

```sh
curl -X GET http://localhost:4000/dashboard \
     -H "Authorization: Bearer <token>"
```

👉 Response:

```json
{
  "message": "Welcome to the dashboard!"
}
```

## 🧪 Testing

### ✅ Run All Tests:

```sh
pnpm test
```

### ✅ Run Auth Server Tests:

```sh
cd auth-server && pnpm test
```

### ✅ Run Frontend Tests:

```sh
cd frontend && pnpm test
```

### ✅ Run Tests in Watch Mode:

```sh
cd [auth-server|frontend] && pnpm test:watch
```

### ✅ Run Specific Test:

```sh
cd [auth-server|frontend] && pnpm test -t "test name"
```

### 🔹 Testing Stack:
- **Auth Server**: Jest + ts-jest + supertest for API testing
- **Frontend**: Jest + React Testing Library for component testing
- **Coverage Reports**: Generate with `pnpm test -- --coverage`

## 🚢 Deployment

### ✅ Build for Production:
```sh
pnpm build
```

### ✅ Start Docker Containers:
```sh
docker-compose up --build -d
```

## 🤝 Contributing
1. Fork the repo
2. Create a new branch
3. Make changes
4. Open a pull request

## 📜 License
MIT
