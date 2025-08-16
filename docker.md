# Docker and Dockerizing a React Project

## What is Docker?

Docker is a platform that enables developers to package applications and their dependencies into containers. Containers are lightweight, portable, and ensure consistency across different environments.

## Steps to Dockerize a React Project

### 1. Create a `Dockerfile`

A `Dockerfile` contains instructions to build a Docker image for your React app.

```dockerfile
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
```

### 2. Create a `.dockerignore` File

The `.dockerignore` file tells Docker which files and directories to ignore when building the image. This helps reduce image size and build time.

```
node_modules
```

### 3. Build and Run the Docker Container

- Build the image:  
    ```sh
    docker build -t my-react-app .
    ```
- Run the container:  
    ```sh
    docker run -p 3000:3000 my-react-app
    ```

Your React app will now be running inside a Docker container, accessible at `http://localhost:3000`.
