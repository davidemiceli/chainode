'use strict';
/*
  Load and parse configurations
*/
// Requirements
const _ = require('lodash');
const uuid4 = require('uuid/v4');
const logFormatter = require('../lib/logFormatter');
const BroadcastStrategy = require('../lib/services/broadcastStrategy');
const defaultConfigs = require('../configs/defaults');


// Get configurations from file
const getConfigs = () => {
  try {
    return require(process.env.CONFIGS);
  } catch(err) {
    console.error('Missing environmental parameter "CONFIGS" (path and name of configuration file).');
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = () => {
  try {
    // Get configurations
    const rawConfigs = getConfigs();
    // Extends missing fields with defaults
    const configs = Object.assign(defaultConfigs, rawConfigs);
    // General
    configs.blockchain = process.env.BLOCKCHAIN || configs.blockchain;
    configs.role = process.env.ROLE || configs.role;
    configs.id = process.env.PEER_ID || configs.id;
    // Database
    configs.db.host = process.env.DB_HOST || configs.db.host;
    configs.db.port = process.env.DB_PORT || configs.db.port;
    configs.db.dbname = process.env.DB_NAME || configs.db.dbname;
    // Broker
    configs.broker.nodeID = configs.id;
    configs.broker.namespace = configs.blockchain;
    configs.broker.transporter = _.sample(configs.broker.transporter);
    configs.broker.strategy = {
      registry: {
        strategy: "RoundRobin"
        // strategy: BroadcastStrategy
      }
    };
    configs.broker.logFormatter = function(level, args, bindings) {
      return logFormatter(configs.role)(level, args, bindings);
    }
    configs.broker.retryPolicy.check = err => err && !!err.retryable;
    configs.broker.circuitBreaker.check = err => err && err.code >= 500;
    // Web Console
    configs.webui.port = process.env.WEBUI_PORT || 8080;
    return configs;
  } catch(err) {
    console.error('Error on loading configurations.');
    console.error(err.stack);
    process.exit(1);
  }
}
