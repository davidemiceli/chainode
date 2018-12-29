'use strict';


// Return the services of a specified peer
module.exports = peerRole => {
  // Common services
  const commonServices = [];
  // Custom services by peer role
  switch(peerRole) {
    case 'blockgenerator':
      return [
        ...commonServices,
        require('../services/blockgenerator.service')()
      ];
    case 'peer':
      return [
        ...commonServices,
        require('../services/peer.service')()
      ];
    default:
      throw Error('Invalid peer role.');
  }
}
