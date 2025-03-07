# Use the latest Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies with production flag for optimization
RUN npm install --omit=dev

# Copy the entire application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Use CMD to start the backend application
CMD ["npm", "start"]
