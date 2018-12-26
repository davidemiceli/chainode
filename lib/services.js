'use strict';


// Return the services of a specified peer
module.exports = peerType => {
  // Common services
  const commonServices = [];
  // Custom services by peer type
  switch(peerType) {
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
      throw Error('Invalid peer type.');
  }
}
