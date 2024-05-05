
FROM node:21.7.0

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 8081

CMD npm start



