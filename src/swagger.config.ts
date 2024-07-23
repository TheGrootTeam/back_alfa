import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Endpoints API Alfa',
      version: '1.0.0',
      description: 'API Alfa build in NodeJS with Typescript'
    }
  },
  apis: ['./src/routes/*.ts']
};
