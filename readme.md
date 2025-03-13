TODO: move vars to .env instead of hardcoding
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
│   ├── src/                # Source code
│   │   ├── index.ts        # Main entry point
│   │   └── index.test.ts   # API tests
│   ├── jest.config.js      # Jest configuration
│   └── tsconfig.json       # TypeScript configuration
├── frontend/               # Frontend service (React + Vite)
│   ├── src/                # Source code
│   │   ├── pages/          # React components
│   │   │   ├── Login.tsx   # Login component
│   │   │   ├── Login.test.tsx # Login component tests
│   │   │   ├── Dashboard.tsx # Dashboard component
│   │   │   └── Dashboard.test.tsx # Dashboard component tests
│   ├── jest.config.js      # Jest configuration
│   └── tsconfig.json       # TypeScript configuration
├── db/                     # Database setup (Postgres + pgjwt)
├── CLAUDE.md               # Project guidelines and commands
├── docker-compose.yml      # Docker orchestration
├── .env                    # Local environment configuration
└── .gitignore
```

## 🛠️ **Setup Instructions**
Follow these steps to get the project up and running locally.

### ✅ 1. Clone the Repository

```sh
git clone git@github.com:yourusername/project.git
cd project
```
---

### ✅ 2. Install Dependencies
Using pnpm for fast dependency management and efficient disk usage.

```sh
pnpm install
```
---

### ✅ 3. Create a .env File
Create a .env file in the root directory and configure your environment:

```sh
# Backend
DATABASE_URL=postgresql://postgres:postgres@db:5432/authdb
JWT_SECRET=your-secret-key

# Frontend
VITE_API_BASE_URL=http://localhost:4000
```

**Explanation:**

- `DATABASE_URL` → Connection string for PostgreSQL 
- `JWT_SECRET` → Secret key for signing JWTs
- `VITE_API_BASE_URL` → API base URL for the frontend

---

### ✅ 4. Build and Start the Project
Build and start the project using Docker Compose:

```sh
docker-compose up --build
```

**This will:**

Start the PostgreSQL container
Start the backend (Express) container
Start the frontend (React) container

---

### ✅ 5. Running Backend + Frontend Directly (Without Docker)
You can also run the backend and frontend locally:

Backend:
```sh
pnpm --filter backend dev
```

Frontend:
```sh
pnpm --filter frontend dev
```

---

### ✅ 6. Reset State (Clean Build)
If you want to reset and rebuild everything from scratch:

```sh
docker-compose down -v
pnpm clean
docker-compose up --build
```

**This will:**

- Remove all Docker volumes
- Clean out dependencies
- Rebuild everything from scratch

---

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

## 🐳 Docker Overview
### 🔹 Database
PostgreSQL container
pgjwt installed via custom Dockerfile
Auto-seeding of initial data

### 🔹 Backend
TypeScript → Compiled to JS
Runs inside container
Exposes port 4000

### 🔹 Frontend
Vite-based React app
Hot reloading
Exposes port 3000

## 🚀 Common Issues + Fixes
❌ `EADDRINUSE: Address already in use`

**Kill any existing processes:**

```sh
lsof -i :4000
kill -9 <PID>
```

❌ `relation "users" does not exist`
- Make sure the database init script is running:

```sh
docker logs pgjwt-db
```

- If the init script fails, reset the containers:

```sh
docker-compose down -v
docker-compose up --build
```

❌ `pgjwt extension is not available`
- Make sure you’re using the custom Dockerfile to install pgjwt:

```sh
docker-compose down -v
docker-compose up --build
```

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
