# Base image
FROM node:10.15

# Configure environment
ENV LANG=C.UTF-8 \
  LC_ALL=C.UTF-8 \
  DEBIAN_FRONTEND=noninteractive

# Update npm
RUN npm i -g npm
RUN npm cache clean -f

# Install Chainode
RUN npm init --force
RUN npm install chainode
WORKDIR /node_modules/chainode

# Run Chainode peer
CMD npm start
