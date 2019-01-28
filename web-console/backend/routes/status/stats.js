'use strict';
/*
  Get system and process statistics
*/

const os = require('os');


module.exports = function(req, res, next) {
  // Get peer infos
  const {
    blockchain,
    organization,
    id,
    role
  } = req.sdk.configs;

  // Return statistics
  return res.json({
    status: 'active',
    peer: {
      id: id,
      role: role,
      blockchain: blockchain,
      organization: organization
    },
    system: {
      uptime: os.uptime(),
      mem: os.totalmem(),
      freemem: os.freemem(),
      memoryUsage: process.memoryUsage()
    }
  });
}
