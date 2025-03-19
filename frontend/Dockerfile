# Stage 1: Build Stage
FROM node:20 as builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files first
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY turbo.json ./

# Copy the frontend package
COPY frontend frontend/

# Install dependencies within workspace context
RUN pnpm install --frozen-lockfile

# Build the frontend
RUN pnpm --filter frontend build

# Stage 2: Production Stage
FROM node:20-slim as runner

WORKDIR /app

# Install serve to host static files
RUN npm install -g serve

# Copy only the built files (no node_modules needed for static serving)
COPY --from=builder /app/frontend/dist ./dist

EXPOSE 3000

# Serve static files
CMD ["serve", "-s", "dist", "-l", "3000"]
