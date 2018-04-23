'use strict';

// Requirements
const Utils = require('../../lib/utils');

module.exports = function(req, res, next) {
  // Return current peer
  if (req.current_peer) delete req.current_peer.private;
  return res.json(req.current_peer || null);
}
