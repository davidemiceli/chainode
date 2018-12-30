'use strict';
/*
  Routes Mapping
*/

// Routes
module.exports = {
  // Dashboard
  MAIN: '/',
  DASHBOARD: '/dashboard',
  // Monitoring peer server
  STATUS: '/api',
  // Client authorization
  AUTH: {
    SIGNIN: 'api/auth/signin',
    SIGNUP: 'api/auth/signup',
    LOGOUT: 'api/auth/logout'
  },
  // Block management
  BLOCK: {
    PROPOSE: '/api/block/propose',
    LIST: '/api/block/list'
  },
  // Peer management
  PEER: {
    NEW: 'api/peer/new',
    AUTH: 'api/peer/auth',
    VERIFY: 'api/peer/verify',
    LIST: 'api/peer/list'
  }
};
