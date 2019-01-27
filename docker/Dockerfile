# Base image
FROM node:10.12

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Update packages
RUN apt-get update && \
    apt-get install -y apt-utils git && \
    apt-get upgrade -y

RUN git clone -b develop --single-branch https://github.com/davidemiceli/chainode.git

# Create app directory
WORKDIR /chainode

# Update npm
RUN npm i -g npm

# Install useful packages
RUN npm cache clean -f

CMD npm start
