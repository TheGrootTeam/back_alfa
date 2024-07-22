FROM node:22.3.0-slim
RUN mkdir /code
COPY . /code
WORKDIR /code
RUN apt update && apt upgrade -y && npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000