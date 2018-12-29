'use strict';

// Requirements
const { ServiceBroker } = require("moleculer");
const brokerConfigs = require('../configs/broker.config');
const metricsService = require('./monitoring/metrics.jaeger');
const services = require('./services');
// Select database
const selectDb = require('./database/select');

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


// Create the broker client
module.exports = async (nodeID, peerRole, configs) => {
  try {
    // Init the broker
    const brokerConfs = brokerConfigs(nodeID);
    const broker = new PeerBroker(brokerConfs);

    broker.callAll = require('./services/callAll');

    // Get database model
    broker.DB = selectDb(configs.db, broker.logger);

    // Load metrics service
    await broker.createService(metricsService);

    // Load services
    services(peerRole)
      .map(async s => await broker.createService(s));

    // Wait for services
    await broker.waitForServices();

    // Start broker
    await broker.start();

    return broker;
  } catch(err) {
    throw err;
  }
}