# Stage 1: Build Stage
FROM node:20 as builder

RUN npm install -g pnpm

WORKDIR /app

COPY ./pnpm-lock.yaml ./
COPY ./package.json ./

# ✅ Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --prod=false

# ✅ Copy the rest of the code
COPY . .

# ✅ Build frontend
RUN pnpm run build

# Stage 2: Production Stage
FROM node:20-slim as runner

WORKDIR /app

# ✅ Copy compiled frontend files from builder stage
COPY --from=builder /app/dist ./dist

# ✅ Install only production dependencies using npm
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules

# ✅ Install serve to host static files
RUN npm install -g serve

RUN rm -rf ~/.pnpm-store

EXPOSE 3000

# ✅ Serve static files using `serve`
CMD ["serve", "-s", "dist", "-l", "3000"]
