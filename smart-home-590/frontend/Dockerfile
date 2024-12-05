# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the frontend for production
RUN npm run build

# Serve the frontend using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
