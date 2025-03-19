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

# Copy the auth-server package
COPY auth-server auth-server/

# Install dependencies within workspace context
RUN pnpm install --frozen-lockfile

# Build the auth-server
RUN pnpm --filter auth-server build

# Create a pruned production copy with dependencies
RUN pnpm deploy --filter auth-server --prod /tmp/auth-server-prod

# Stage 2: Production Stage
FROM node:20-slim as runner

WORKDIR /app

# Copy only the production files
COPY --from=builder /tmp/auth-server-prod/node_modules ./node_modules
COPY --from=builder /app/auth-server/dist ./dist

EXPOSE 4000

# Start the server
 CMD ["node", "dist/index.js"]
