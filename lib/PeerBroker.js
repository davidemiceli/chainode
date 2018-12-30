'use strict';

// Requirements
const { ServiceBroker } = require("moleculer");


// Set status
const setStatus = (o) => ({
  active: function() {
    o.__setStatus('active')
  },
  idle: function() {
    o.__setStatus('idle');
  },
  sync: function() {
    o.__setStatus('sync');
  }
});


// Peer broker
class PeerBroker extends ServiceBroker {
  constructor(...args) {
    super(...args);
    this.setStatus = setStatus(this);
  }

  // Get status
  status() {
    return this.__status;
  }

  // Check status
  onStatus(status) {
    return this.__status === status;
  }

  // Set status
  __setStatus(status) {
    this.__status = status;
    this.logger.info(`Set status to ${status}.`);
  }
}


module.exports = PeerBroker;
