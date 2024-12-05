
# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all server files
COPY . .

# Expose the server port
EXPOSE 4004

# Start the server
CMD ["node", "server.js"]

