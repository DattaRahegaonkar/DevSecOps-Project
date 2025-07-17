# Base Image
FROM node:18-alpine

# Working Directory
WORKDIR /app

# Package Installation
COPY package*.json ./
RUN npm install

# Copying the code
COPY . .

RUN npm run build

# port
EXPOSE 5173

# Run
CMD ["npm","run","dev","--","--host","--port","5173"]
