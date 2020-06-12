FROM node:9-slim
WORKDIR /docker
COPY package.json /docker
RUN npm install
COPY . /docker
CMD ["npm", "start"]