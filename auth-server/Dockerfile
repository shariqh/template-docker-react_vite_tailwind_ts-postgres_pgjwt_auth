# Stage 1: Build Stage
FROM node:20 as builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# ✅ Copy package files + pnpm lockfile from auth-server
COPY ./pnpm-lock.yaml ./
COPY ./package.json ./

# ✅ Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --prod=false

# ✅ Copy the rest of the code
COPY . .

# ✅ Build TypeScript
RUN pnpm run build

# Stage 2: Production Stage
FROM node:20-slim as runner

WORKDIR /app

# ✅ Copy compiled JS files from builder stage
COPY --from=builder /app/dist ./dist

# ✅ Copy node_modules from builder instead of running pnpm again
COPY --from=builder /app/node_modules ./node_modules

# ✅ Copy package.json for runtime
COPY --from=builder /app/package.json ./

EXPOSE 4000

# ✅ Start the server using pre-compiled JS
CMD ["node", "dist/index.js"]
