# 💻 Proyecto Alfa - BackEnd

## Scripts

- `npm start:` ejecuta la aplicación en modo producción
- `npm run dev:` inicia en modo desarrollo con compilación en tiempo real.
- `npm run build:` compila el código TS a JS con previa eliminación del directorio **dist/** para evitar posibles problemas.
- `npm run test:` ejecuta los tests
- `npm run test:watch:` ejecuta los test de forma continua, monitoreando los cambios en el código en tiempo real.
- `npm run lint:` analiza el código
- `npm run lint:fix:`lo analiza y corriga los errores
- `npm run format:` formatea con Prettier todos los documentos dentro del directorio src/

## Tecnologías utilizadas

_\* in progress, se irá actualizando_

![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge) ![.ENV Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Jest Badge](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge)


# README DRAFT


# Endpoints API Alfa

This project is an API built with Node.js and TypeScript. It provides various endpoints for login, registration, profile management, offers, and info dashboards. The API is documented using Swagger.

## Table of Contents
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/back-alfa.git
   cd back-alfa
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables.

## Scripts

Here are some useful scripts you can run:

- `npm start`: Starts the application in production mode.
- `npm run dev`: Starts the application in development mode with `ts-node-dev`.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run test`: Runs the tests.
- `npm run lint`: Lints the TypeScript code.
- `npm run format`: Formats the code using Prettier.

## Usage

### Development

To start the development server, run:
```sh
npm run dev
```

The server will start on the port specified in your environment variables (default is `3000`).

### Production

To build and start the server in production mode, run:
```sh
npm run buildstart
```

## API Documentation

### Base URL
The base URL for all API endpoints is:
```
http://localhost:3000/api/v1
```

### Endpoints

#### 1. Login

**POST** `/login`

- **Description**: Authenticates a user and returns a token.
- **Request**:
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "token": "dsfoig324okjtl24"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "wrong password"
    }
    ```

#### 2. Register

**POST** `/register`

- **Description**: Registers a new user.
- **Request**:
  - Body:
    ```json
    {
      "dniCif": "12345678A",
      "password": "password123",
      "isCompany": false,
      "email": "user@example.com"
    }
    ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "error": "Invalid input data"
    }
    ```

#### 3. Profile Update

**PUT** `/profile/update`

- **Description**: Updates user profile information.
- **Request**:
  - Headers:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
  - Body:
    ```json
    {
      "name": "New Name",
      "email": "newemail@example.com"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "error": "Invalid input data"
    }
    ```

#### 4. Offers

**GET** `/offers`

- **Description**: Retrieves a list of offers.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "offer1",
        "title": "Offer Title",
        "description": "Offer Description",
        "price": 100
      },
      ...
    ]
    ```

**POST** `/offers/new`

- **Description**: Creates a new offer.
- **Request**:
  - Headers:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
  - Body:
    ```json
    {
      "title": "Offer Title",
      "description": "Offer Description",
      "price": 100
    }
    ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "Offer created successfully"
    }
    ```

**PATCH** `/offers/edit`

- **Description**: Edits an existing offer.
- **Request**:
  - Headers:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
  - Body:
    ```json
    {
      "id": "offer1",
      "title": "Updated Offer Title",
      "description": "Updated Offer Description",
      "price": 150
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Offer updated successfully"
    }
    ```

#### 5. Info Dashboards

**GET** `/infoDashboards/:applicantOrCompany`

- **Description**: Retrieves information dashboards based on the type of user (applicant or company).
- **Request**:
  - Headers:
    ```json
    {
      "Authorization": "Bearer <token>"
    }
    ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "data": [
        {
          "metric": "Some Metric",
          "value": 123
        },
        ...
      ]
    }
    ```

## Project Structure

```bash
.
├── src
│   ├── bin
│   │   └── www.ts             # Entry point for the application
│   ├── controllers            # Controllers for handling API requests
│   │   ├── CreateOfferController.ts
│   │   ├── LoginController.ts
│   │   ├── RegisterController.ts
│   │   ├── EditProfileController.ts
│   ├── middlewares            # Custom middleware functions
│   │   └── authJWT.ts
│   ├── routes                 # API routes
│   │   ├── index.ts
│   │   ├── offersRoutes.ts
│   │   ├── loginRoutes.ts
│   │   ├── registerRoutes.ts
│   │   ├── profileRoutes.ts
│   ├── swagger.config.ts      # Swagger configuration
├── package.json               # Project dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the ISC License. See the LICENSE file for more information.
