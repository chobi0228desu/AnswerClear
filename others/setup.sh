#!/bin/bash

# プロジェクト名
PROJECT_NAME="answer_clear"

# フォルダ構成の作成
mkdir -p $PROJECT_NAME/backend
mkdir -p $PROJECT_NAME/front/public
mkdir -p $PROJECT_NAME/front/src

# backend/Dockerfile
cat <<EOL > $PROJECT_NAME/backend/Dockerfile
# backend/Dockerfile
FROM golang:1.20-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .

CMD ["./main"]
EOL

# backend/go.mod
cat <<EOL > $PROJECT_NAME/backend/go.mod
module backend

go 1.20

require (
    github.com/gin-gonic/gin v1.7.4
)
EOL

# backend/main.go
cat <<EOL > $PROJECT_NAME/backend/main.go
// backend/main.go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello from Gin!"})
    })
    r.Run() // デフォルトで ":8080" で起動
}
EOL

# front/Dockerfile
cat <<EOL > $PROJECT_NAME/front/Dockerfile
# front/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
EOL

# front/package.json
cat <<EOL > $PROJECT_NAME/front/package.json
{
  "name": "front",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  },
  "devDependencies": {
    "typescript": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
EOL

# front/tsconfig.json
cat <<EOL > $PROJECT_NAME/front/tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
EOL

# front/public/index.html
cat <<EOL > $PROJECT_NAME/front/public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
EOL

# front/src/index.tsx
cat <<EOL > $PROJECT_NAME/front/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // ここでCSSをインポートします

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

# front/src/App.tsx
cat <<EOL > $PROJECT_NAME/front/src/App.tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to React with Tailwind CSS!</h1>
    </div>
  );
}

export default App;
EOL

# front/src/index.css
cat <<EOL > $PROJECT_NAME/front/src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
EOL

# front/tailwind.config.js
cat <<EOL > $PROJECT_NAME/front/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# docker-compose.yml
cat <<EOL > $PROJECT_NAME/docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "8080:8080"
    networks:
      - app-network

  frontend:
    build:
      context: ./front
    ports:
      - "3000:3000"
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: mydb
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOL

# Goの依存関係を解決
cd $PROJECT_NAME/backend
go mod tidy

# npmの依存関係を解決
cd ../front
npm install

# docker-composeのビルド
cd ..
docker-compose up --build

echo "プロジェクトのセットアップが完了しました。"
