'use strict';
/*
  Routes Mapping
*/

// Routes
module.exports = {
  // Monitoring peer server
  MAIN: '/',
  // Client authorization
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout'
  },
  // Peer management
  PEER: {
    NEW: '/peer/new',
    AUTH: '/peer/auth',
    VERIFY: '/peer/verify',
    LIST: '/peer/list'
  }
};
