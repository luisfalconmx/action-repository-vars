# Container image that runs your code
FROM node:18-alpine

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY ./ /app/

# 
WORKDIR /app

#
RUN npm install
RUN npm run build
