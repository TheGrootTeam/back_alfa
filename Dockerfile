FROM node:22.3.0-slim AS build
WORKDIR /code
COPY package*.json .
RUN  npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000