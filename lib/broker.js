'use strict';

// Requirements
const { ServiceBroker } = require("moleculer");
const brokerConfigs = require('../configs/broker.config');
const metricsService = require('./monitoring/metrics.jaeger');
const serviceList = require('./serviceList');


// Create the broker client
module.exports = async (nodeID, peerType) => {
  try {
    // Init the broker
    const configs = brokerConfigs(nodeID);
    const broker = new ServiceBroker(configs);

    // Load metrics service
    await broker.createService(metricsService);

    // Load services
    serviceList(peerType)
      .map(name => `./services/${name}.service.js`)
      .map(async s => await broker.loadService(s));

    // Wait for services
    await broker.waitForServices();

    // Start broker
    await broker.start();

    return broker;
  } catch(err) {
    throw err;
  }
}