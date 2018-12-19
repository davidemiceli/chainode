'use strict';


// List of services by peer
const services = {
  blockgenerator: [
    'blockgenerator'
  ],
  peer: [
    'peer'
  ]
};

// Return the list of services of a specified peer
module.exports = (peer) => services[peer];
