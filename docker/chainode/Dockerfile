# Base image
FROM debian:8

# Node.js version
ARG NODEJS_VERSION=8

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    SBT_VERSION=1.1.1 \
    DEBIAN_FRONTEND=noninteractive

# Update packages
RUN apt-get update && \
    apt-get install -y apt-utils && \
    apt-get upgrade -y

# Install utilities
RUN apt-get install -y \
    build-essential \
    software-properties-common \
    apt-transport-https \
    curl \
    git \
    htop \
    unzip \
    wget

# install Redis database
RUN apt-get install -y redis-server

# Install node.js
RUN curl -sL https://deb.nodesource.com/setup_$NODEJS_VERSION.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Update npm
RUN npm i -g npm

# Install useful packages
RUN npm cache clean -f
RUN npm install -g bower pm2
RUN echo '{ "allow_root": true }' > /root/.bowerrc
