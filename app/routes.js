'use strict';
/*
  Routes Mapping
*/

// Routes
module.exports = {
  // Monitoring peer server
  MAIN: '/',
  // Peer management
  PEER: {
    INDEX: '/peer',
    BLOCKGENERATOR: '/blockgenerator',
    NEW: '/peer/new',
    LIST: {
      JOINED: '/peer/list/joined',
      PENDING: '/peer/list/pending',
    }
  },
  // Permission
  PERMISSION: {
    JOINED: '/permission/joined',
    JOIN: {
      ASK: '/permission/join/ask',
      RECEIVE: '/permission/join/receive',
      APPROVE: '/permission/join/approve',
    }
  },
  // Transaction
  TRANSACTION: {
    PROPOSE: '/transaction/propose',
    RECEIVE: '/transaction/receive',
  },
  // Blocks methods
  BLOCKS: {
    SYNC: '/blocks/sync',
    LATEST: '/blocks/latest'
  }
};
