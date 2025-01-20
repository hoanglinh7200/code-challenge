# Express + TypeScript + MongoDB Backend

This project is a backend server built with Express.js, TypeScript, and MongoDB using Mongoose. It implements a CRUD interface for managing resources and includes Swagger documentation for the API.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (v4 or later)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Env file:**

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start MongoDB: (using mongodb by local - do not do this step if you use docker)**

   Ensure MongoDB is running locally. By default, the application connects to `mongodb://localhost:27017/challenge_code`. You can modify this in the `mongoose.connect` function in the code if needed.

5. **Run the application:**

   ```bash
   npm run build-ts
   ```

   This command will compile the TypeScript code to JavaScript.

6. **Run the application (with docker):**

   ```bash
   docker-compose up --build
   ```

   This command will start the server with docker.

7. **API Documentation with Swagger:**

   Once the server is running, you can access the Swagger UI at:

   **URL:** `http://localhost:3000/api-docs`



## Scripts

- `npm run build-ts`: Compile the TypeScript code to JavaScript
- `npm run dev`: Start the development server with live reloading
- `npm start`: Start the compiled server

## License

This project is licensed under the MIT License.

