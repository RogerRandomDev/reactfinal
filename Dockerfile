FROM node:latest
ARG interactive=false
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3000
EXPOSE 5000
EXPOSE 5001
CMD npm start