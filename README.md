
# 💻 Proyecto InternIT - Backend

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

## Descripcion

Este repositorio contiene el código del backend del **Proyecto InternIT**, una API desarrollada en **Node.js** y **TypeScript** para gestionar la comunicación entre empresas y aplicantes de empleo. Proporciona una serie de endpoints para la autenticación, gestión de perfiles, ofertas de trabajo y paneles informativos. Además, se utiliza **MongoDB** como base de datos.

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
