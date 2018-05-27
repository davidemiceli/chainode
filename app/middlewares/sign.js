'use strict';

/*
  Middlewares to generate the signatures and verify the peer
*/

module.exports = {
  add: require('./sign/addsign'),
  verify: require('./sign/verify')
};
