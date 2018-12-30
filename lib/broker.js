'use strict';

// Requirements
const PeerBroker = require('./PeerBroker');
const metricsService = require('./monitoring/metrics.jaeger');
const services = require('./services');
// Select database
const selectDb = require('./database/select');


// Create the broker client
module.exports = async (peerRole, configs) => {
  try {
    // Init the broker
    const broker = new PeerBroker(configs.broker);

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