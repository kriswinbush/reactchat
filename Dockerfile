FROM node:11 as build-stage

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

CMD ["npm", "run", "server"] 
