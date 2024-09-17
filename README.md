# 💻 Proyecto InternIT - Backend

🇪🇸 Versión en Español

## Tabla de Contenidos
- [💻 Proyecto InternIT - Backend](#-proyecto-internit---backend)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripcion](#descripcion)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Documentación Técnica](#documentación-técnica)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Comandos Disponibles](#comandos-disponibles)
    - [Desarrollo](#desarrollo)
    - [Producción](#producción)
    - [Endpoints principales:](#endpoints-principales)
      - [Autenticación](#autenticación)
      - [Gestión de Perfiles](#gestión-de-perfiles)
      - [Gestión de Ofertas](#gestión-de-ofertas)
      - [Dashboards de Información](#dashboards-de-información)
    - [Descripcion detallada de los Endpoints](#descripcion-detallada-de-los-endpoints)
    - [Endpoints](#endpoints)
      - [1. Login](#1-login)
      - [2. Register](#2-register)
      - [3. Profile Update](#3-profile-update)
      - [4. Offers](#4-offers)
      - [5. Info Dashboards](#5-info-dashboards)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Arquitectura](#arquitectura)
    - [Principales capas de la arquitectura:](#principales-capas-de-la-arquitectura)
  - [Uso de Docker](#uso-de-docker)
    - [Construcción de la imagen Docker:](#construcción-de-la-imagen-docker)
    - [Ejecución del contenedor Docker:](#ejecución-del-contenedor-docker)
  - [Estado del Proyecto](#estado-del-proyecto)
  - [Colaboradores del Proyecto](#colaboradores-del-proyecto)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)
- [💻 InternIT Project - Backend](#-internit-project---backend)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Technologies Used](#technologies-used)
  - [Technical Documentation](#technical-documentation)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Available Commands](#available-commands)
    - [Development](#development)
    - [Production](#production)
    - [Main Endpoints:](#main-endpoints)
      - [Authentication](#authentication)
      - [Profile Management](#profile-management)
      - [Job Offer Management](#job-offer-management)
      - [Information Dashboards](#information-dashboards)
    - [Detailed Endpoint Descriptions](#detailed-endpoint-descriptions)
    - [Endpoints](#endpoints-1)
      - [1. Login](#1-login-1)
      - [2. Register](#2-register-1)
      - [3. Profile Update](#3-profile-update-1)
      - [4. Offers](#4-offers-1)
      - [5. Info Dashboards](#5-info-dashboards-1)
  - [Project Structure](#project-structure)
  - [Architecture](#architecture)
    - [Main Layers of the Architecture:](#main-layers-of-the-architecture)
  - [Using Docker](#using-docker)
    - [Building the Docker Image:](#building-the-docker-image)
    - [Running the Docker Container:](#running-the-docker-container)
  - [Project Status](#project-status)
  - [Project Contributors](#project-contributors)
  - [Contributions](#contributions)
  - [License](#license)

## Descripcion

Este repositorio contiene el código del backend de la aplicacion **InternIT**, una API desarrollada en **Node.js** y **TypeScript** para gestionar la comunicación entre empresas y aplicantes de empleo. Proporciona una serie de endpoints para la autenticación, gestión de perfiles, ofertas de trabajo y paneles informativos. Además, se utiliza **MongoDB** como base de datos.

## Tecnologías Utilizadas

El backend de esta aplicación está construido con tecnologías modernas que aseguran escalabilidad, seguridad y un desarrollo eficiente. A continuación, se listan las principales tecnologías utilizadas junto con sus versiones:

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **v22.3.0**: Plataforma de ejecución JavaScript en el servidor.
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) **v5.5.3**: Lenguaje de programación que añade tipado estático a JavaScript.
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **v4.19.2**: Framework para Node.js utilizado para crear la API RESTful.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **v6.8.0**: Base de datos NoSQL utilizada para almacenar la información de la aplicación.
- ![Mongoose](https://img.shields.io/badge/mongoose-%2368A063.svg?style=for-the-badge&logo=mongodb&logoColor=white) **v8.5.1**: Librería de modelado para MongoDB y Node.js.
- ![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge) **v29.7.0**: Framework de testing utilizado para pruebas unitarias.
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white) **v6.2.8**: Utilizado para documentar la API.
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) **v8.57.0**: Herramienta para la verificación del código, asegurando un código limpio y consistente.
- ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) **v3.3.3**: Formateador de código para mantener una consistencia en el estilo de escritura.
- ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logoColor=000) **v16.4.5**: Utilizado para cargar variables de entorno desde un archivo `.env` en el proceso de Node.js.
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white): Tecnología de contenedores utilizada para desplegar la aplicación en distintos entornos.

## Documentación Técnica

Puedes encontrar más detalles sobre las tecnologías y módulos utilizados en este proyecto en la siguiente documentación:

- [Node.js](https://nodejs.org/docs)
- [Express.js](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/docs/)
- [Swagger](https://swagger.io/docs/)
- [Mongoose](https://mongoosejs.com/docs/)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes software en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (v14.0.0 o superior)
- [npm](https://www.npmjs.com/) (v6.0.0 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Instalación y Configuración

Para empezar con el desarrollo de este proyecto, sigue los pasos a continuación:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/back_internit.git
   cd back_internit
   ```

2. **Instalar dependencias**:
   Asegúrate de tener Node.js instalado. Luego, ejecuta el siguiente comando:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Debes configurar las variables de entorno en un archivo `.env` en la raíz del proyecto, siguiendo el formato de `.env.example`. Las variables clave incluyen:
   - `MONGODB_URI`: La URI de conexión a MongoDB.
   - `JWT_SECRET`: La clave secreta para el uso de JWT.
   - `PORT`: El puerto en el que se ejecutará el servidor.

4. **Iniciar la base de datos**:
   ```bash
   npm run initDB
   ```

## Comandos Disponibles

- **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

- **Compilar el proyecto**:
   ```bash
   npm run build
   ```

- **Iniciar el servidor en producción**:
   ```bash
   npm start
   ```

- **Ejecutar pruebas**:
   ```bash
   npm run test
   ```

- **Linting**:
   ```bash
   npm run lint
   ```

- **Formatear el código**:
   ```bash
   npm run format
   ```

### Desarrollo

Para iniciar el servidor en modo desarrollo, ejecuta el siguiente comando:
```bash
npm run dev
```

El servidor se iniciará en el puerto especificado en las variables de entorno (por defecto en `http://localhost:3000`).

### Producción

Para construir y ejecutar el servidor en modo producción, sigue estos pasos:

1. Compila el código:
   ```bash
   npm run build
   ```

2. Inicia el servidor:
   ```bash
   npm start
   ```

### Endpoints principales:

#### Autenticación

- **POST** `/login`: Iniciar sesión y obtener un token JWT.
- **POST** `/register`: Registrar un nuevo usuario (empresa o aplicante).

#### Gestión de Perfiles

- **GET** `/profile`: Obtener el perfil del usuario autenticado.
- **PUT** `/profile/update`: Actualizar la información del perfil.

#### Gestión de Ofertas

- **GET** `/offers`: Obtener una lista de ofertas de trabajo.
- **POST** `/offers/new`: Crear una nueva oferta de trabajo.
- **PATCH** `/offers/edit`: Editar una oferta de trabajo existente.

#### Dashboards de Información

- **GET** `/infoDashboards/:applicantOrCompany`: Obtener métricas e información en tiempo real para el tipo de usuario.

### Descripcion detallada de los Endpoints

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

## Estructura del Proyecto

A continuación, se muestra una visión general de la estructura del proyecto:

```
.
├── src
│   ├── bin
│   │   └── www.ts             # Punto de entrada de la aplicación
│   ├── controllers            # Controladores de las API
│   │   ├── CreateOfferController.ts
│   │   ├── LoginController.ts
│   │   ├── RegisterController.ts
│   │   ├── EditProfileController.ts
│   ├── middlewares            # Funciones de middleware personalizadas
│   │   └── authJWT.ts
│   ├── models                 # Modelos de MongoDB (Schemas)
│   │   ├── Applicant.ts
│   │   ├── Company.ts
│   │   ├── Offer.ts
│   ├── routes                 # Definición de rutas de la API
│   │   ├── index.ts
│   │   ├── offersRoutes.ts
│   │   ├── loginRoutes.ts
│   │   ├── registerRoutes.ts
│   │   ├── profileRoutes.ts
│   ├── swagger.config.ts      # Configuración de Swagger para la documentación de la API
├── package.json               # Dependencias y scripts del proyecto
└── tsconfig.json              # Configuración de TypeScript
```

## Arquitectura

El backend de esta aplicación sigue una arquitectura **modular y escalable**, organizada por capas. A continuación, se describen los principales componentes de la arquitectura:

- **Controladores (Controllers)**: Los controladores manejan las peticiones de la API, procesan los datos y delegan las operaciones de la base de datos a los modelos.
- **Modelos (Models)**: Los modelos definen la estructura de los datos en MongoDB utilizando Mongoose, lo que permite la interacción directa con la base de datos.
- **Middlewares**: Los middlewares se encargan de tareas como la autenticación con JWT, la validación de datos y el manejo de errores.
- **Swagger**: La documentación de la API se genera automáticamente utilizando Swagger, lo que facilita el consumo de la API por parte de otros desarrolladores.

### Principales capas de la arquitectura:

1. **Capa de Presentación (API)**: Interactúa con el cliente a través de las peticiones HTTP.
2. **Capa de Negocio (Lógica)**: Contiene la lógica de negocio que se implementa en los controladores.
3. **Capa de Persistencia (Base de Datos)**: Gestión y manipulación de datos en MongoDB a través de los modelos de Mongoose.

## Uso de Docker

Este proyecto incluye un archivo `Dockerfile` que permite construir y desplegar la aplicación en un entorno de contenedores.

### Construcción de la imagen Docker:
```bash
docker build -t back_internit .
```

### Ejecución del contenedor Docker:
```bash
docker run -p 3000:3000 back_internit
```

El servidor estará disponible en `http://localhost:3000`.

## Estado del Proyecto

Este proyecto está en **desarrollo activo**. Próximas características incluyen mejoras en la documentación de la API y optimizaciones en el manejo de grandes volúmenes de datos.

## Colaboradores del Proyecto

Este proyecto ha sido desarrollado en su totalidad por el equipo The Goot Team, en el marco del Bootcamp de Desarrollo Web Fullstack (Edición XVI de la escuela [KeepCoding](https://keepcoding.io)).

- Ivette Farre - https://github.com/Iv3tt3
- Carles Espuñes - https://github.com/Cespuess
- Marta Vilaseca - https://github.com/marta-vilaseca
- David Arraras - https://github.com/Darrlop
- Syra Dominguez - https://github.com/SyraDominguez

## Contribuciones

Para contribuir a este proyecto:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request para revisión.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.

___

# 💻 InternIT Project - Backend

🇬🇧 English Version

## Table of Contents
- [💻 Proyecto InternIT - Backend](#-proyecto-internit---backend)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripcion](#descripcion)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Documentación Técnica](#documentación-técnica)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Comandos Disponibles](#comandos-disponibles)
    - [Desarrollo](#desarrollo)
    - [Producción](#producción)
    - [Endpoints principales:](#endpoints-principales)
      - [Autenticación](#autenticación)
      - [Gestión de Perfiles](#gestión-de-perfiles)
      - [Gestión de Ofertas](#gestión-de-ofertas)
      - [Dashboards de Información](#dashboards-de-información)
    - [Descripcion detallada de los Endpoints](#descripcion-detallada-de-los-endpoints)
    - [Endpoints](#endpoints)
      - [1. Login](#1-login)
      - [2. Register](#2-register)
      - [3. Profile Update](#3-profile-update)
      - [4. Offers](#4-offers)
      - [5. Info Dashboards](#5-info-dashboards)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Arquitectura](#arquitectura)
    - [Principales capas de la arquitectura:](#principales-capas-de-la-arquitectura)
  - [Uso de Docker](#uso-de-docker)
    - [Construcción de la imagen Docker:](#construcción-de-la-imagen-docker)
    - [Ejecución del contenedor Docker:](#ejecución-del-contenedor-docker)
  - [Estado del Proyecto](#estado-del-proyecto)
  - [Colaboradores del Proyecto](#colaboradores-del-proyecto)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)
- [💻 InternIT Project - Backend](#-internit-project---backend)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Technologies Used](#technologies-used)
  - [Technical Documentation](#technical-documentation)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Available Commands](#available-commands)
    - [Development](#development)
    - [Production](#production)
    - [Main Endpoints:](#main-endpoints)
      - [Authentication](#authentication)
      - [Profile Management](#profile-management)
      - [Job Offer Management](#job-offer-management)
      - [Information Dashboards](#information-dashboards)
    - [Detailed Endpoint Descriptions](#detailed-endpoint-descriptions)
    - [Endpoints](#endpoints-1)
      - [1. Login](#1-login-1)
      - [2. Register](#2-register-1)
      - [3. Profile Update](#3-profile-update-1)
      - [4. Offers](#4-offers-1)
      - [5. Info Dashboards](#5-info-dashboards-1)
  - [Project Structure](#project-structure)
  - [Architecture](#architecture)
    - [Main Layers of the Architecture:](#main-layers-of-the-architecture)
  - [Using Docker](#using-docker)
    - [Building the Docker Image:](#building-the-docker-image)
    - [Running the Docker Container:](#running-the-docker-container)
  - [Project Status](#project-status)
  - [Project Contributors](#project-contributors)
  - [Contributions](#contributions)
  - [License](#license)

## Description

This repository contains the backend code for the **InternIT** application, an API developed in **Node.js** and **TypeScript** to manage communication between companies and job applicants. It provides a set of endpoints for authentication, profile management, job offers, and information dashboards. In addition, **MongoDB** is used as the database.

## Technologies Used

The backend of this application is built with modern technologies that ensure scalability, security, and efficient development. Below is a list of the main technologies used along with their versions:

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **v22.3.0**: JavaScript runtime platform on the server.
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) **v5.5.3**: Programming language that adds static typing to JavaScript.
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **v4.19.2**: Framework for Node.js used to create the RESTful API.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **v6.8.0**: NoSQL database used to store application data.
- ![Mongoose](https://img.shields.io/badge/mongoose-%2368A063.svg?style=for-the-badge&logo=mongodb&logoColor=white) **v8.5.1**: Modeling library for MongoDB and Node.js.
- ![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge) **v29.7.0**: Testing framework used for unit tests.
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white) **v6.2.8**: Used to document the API.
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) **v8.57.0**: Code verification tool, ensuring clean and consistent code.
- ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) **v3.3.3**: Code formatter to maintain consistency in code style.
- ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logoColor=000) **v16.4.5**: Used to load environment variables from a `.env` file in Node.js processes.
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white): Container technology used to deploy the application in different environments.

## Technical Documentation

You can find more details about the technologies and modules used in this project in the following documentation:

- [Node.js](https://nodejs.org/docs)
- [Express.js](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/docs/)
- [Swagger](https://swagger.io/docs/)
- [Mongoose](https://mongoosejs.com/docs/)

## Prerequisites

Before starting, make sure you have the following software installed in your development environment:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation and Setup

To start development on this project, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/usuario/back_internit.git
   cd back_internit
   ```

2. **Install dependencies**:
   Make sure Node.js is installed. Then, run the following command:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   You need to configure environment variables in a `.env` file in the root of the project, following the format of `.env.example`. The key variables include:
   - `MONGODB_URI`: MongoDB connection URI.
   - `JWT_SECRET`: The secret key for using JWT.
   - `PORT`: The port where the server will run.

4. **Initialize the database**:
   ```bash
   npm run initDB
   ```

## Available Commands

- **Start the development server**:
   ```bash
   npm run dev
   ```

- **Compile the project**:
   ```bash
   npm run build
   ```

- **Start the production server**:
   ```bash
   npm start
   ```

- **Run tests**:
   ```bash
   npm run test
   ```

- **Lint the code**:
   ```bash
   npm run lint
   ```

- **Format the code**:
   ```bash
   npm run format
   ```

### Development

To start the server in development mode, run the following command:
```bash
npm run dev
```

The server will start on the port specified in the environment variables (default is `http://localhost:3000`).

### Production

To build and start the server in production mode, follow these steps:

1. Compile the code:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Main Endpoints:

#### Authentication

- **POST** `/login`: Log in and obtain a JWT token.
- **POST** `/register`: Register a new user (company or applicant).

#### Profile Management

- **GET** `/profile`: Get the profile of the authenticated user.
- **PUT** `/profile/update`: Update profile information.

#### Job Offer Management

- **GET** `/offers`: Get a list of job offers.
- **POST** `/offers/new`: Create a new job offer.
- **PATCH** `/offers/edit`: Edit an existing job offer.

#### Information Dashboards

- **GET** `/infoDashboards/:applicantOrCompany`: Get real-time metrics and information for the type of user.

### Detailed Endpoint Descriptions

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
      "email

": "user@example.com"
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

Below is an overview of the project structure:

```
.
├── src
│   ├── bin
│   │   └── www.ts             # Application entry point
│   ├── controllers            # API controllers
│   │   ├── CreateOfferController.ts
│   │   ├── LoginController.ts
│   │   ├── RegisterController.ts
│   │   ├── EditProfileController.ts
│   ├── middlewares            # Custom middleware functions
│   │   └── authJWT.ts
│   ├── models                 # MongoDB Models (Schemas)
│   │   ├── Applicant.ts
│   │   ├── Company.ts
│   │   ├── Offer.ts
│   ├── routes                 # API route definitions
│   │   ├── index.ts
│   │   ├── offersRoutes.ts
│   │   ├── loginRoutes.ts
│   │   ├── registerRoutes.ts
│   │   ├── profileRoutes.ts
│   ├── swagger.config.ts      # Swagger configuration for API documentation
├── package.json               # Project dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Architecture

The backend of this application follows a **modular and scalable architecture**, organized into layers. Below are the main components of the architecture:

- **Controllers**: Handle API requests, process data, and delegate database operations to models.
- **Models**: Define the data structure in MongoDB using Mongoose, allowing direct interaction with the database.
- **Middlewares**: Responsible for tasks such as JWT authentication, data validation, and error handling.
- **Swagger**: Automatically generates API documentation using Swagger, facilitating API consumption by other developers.

### Main Layers of the Architecture:

1. **Presentation Layer (API)**: Interacts with the client through HTTP requests.
2. **Business Layer (Logic)**: Contains the business logic implemented in the controllers.
3. **Persistence Layer (Database)**: Manages and manipulates data in MongoDB through Mongoose models.

## Using Docker

This project includes a `Dockerfile` that allows you to build and deploy the application in a containerized environment.

### Building the Docker Image:
```bash
docker build -t back_internit .
```

### Running the Docker Container:
```bash
docker run -p 3000:3000 back_internit
```

The server will be available at `http://localhost:3000`.

## Project Status

This project is in **active development**. Upcoming features include improvements to API documentation and optimizations for handling large volumes of data.

## Project Contributors

This project was developed entirely by the **The Goot Team**, as part of the Fullstack Web Development Bootcamp (16th Edition) at [KeepCoding](https://keepcoding.io).

- Ivette Farre - https://github.com/Iv3tt3
- Carles Espuñes - https://github.com/Cespuess
- Marta Vilaseca - https://github.com/marta-vilaseca
- David Arraras - https://github.com/Darrlop
- Syra Dominguez - https://github.com/SyraDominguez

## Contributions

To contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the changes to your repository (`git push origin feature/new-feature`).
5. Open a Pull Request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
