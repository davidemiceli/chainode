# Base image
FROM node:10.12

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Create app directory
WORKDIR /app

# Update npm
RUN npm i -g npm

# Install useful packages
RUN npm cache clean -f

# CMD npm start
