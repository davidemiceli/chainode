'use strict';

// Monitoring server health status
module.exports = function(req, res, next) {
  return res.json({status: 'active'});
}
