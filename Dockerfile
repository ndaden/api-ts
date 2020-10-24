FROM node:13.13-alpine3.10
#USER node
EXPOSE 3000
RUN mkdir -p /opt/app && chown node:node /opt/app
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]