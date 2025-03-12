# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the frontend
RUN npm run build

# Serve the frontend using a lightweight web server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]

# Expose port 3000
EXPOSE 3000
