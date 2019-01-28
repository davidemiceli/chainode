'use strict';
/*
  Load and handle configurations
*/

// Requirements
const uuid4 = require('uuid/v4');
const defaultConfigs = require('./defaults');
const getConfigs = require('./getConfigs');


// Check params
const checkParams = configs => {
  if (!/^(peer)$/.test(configs.role)) throw Error(`Invalid peer role ${configs.role}.`);
  if (!configs.kafka.consumer.groupId) throw Error('Missing kafka.consumer.groupId configuration.');
  return true;
}

// Convert a comma separated string as a list of hosts
const getHosts = hosts => hosts ? hosts.replace(/^\s+/,'').split(',') : undefined;


// Handle configurations
module.exports = () => {
  try {
    // Get configurations from a json file
    const rawConfigs = getConfigs();
    // Extends missing fields with defaults
    const configs = Object.assign(defaultConfigs, rawConfigs);
    // General
    configs.blockchain = process.env.BLOCKCHAIN || configs.blockchain;
    configs.organization = process.env.ORGANIZATION || configs.organization;
    configs.role = process.env.ROLE || configs.role;
    configs.id = process.env.PEER_ID || configs.id || uuid4();
    // Kafka
    configs.kafka.consumer.groupId = process.env.GROUPID || configs.kafka.consumer.groupId;
    configs.kafka.hosts = getHosts(process.env.KAFKA_HOSTS) || configs.kafka.hosts;
    // Database
    configs.db.hosts = getHosts(process.env.DB_HOSTS) || configs.db.hosts;
    configs.db.bucket = process.env.DB_BUCKET || configs.db.bucket;
    // Web Console
    configs.webconsole.host = process.env.WEBUI_HOST || configs.webconsole.host || 'http://localhost';
    configs.webconsole.port = process.env.WEBUI_PORT || configs.webconsole.port || 8080;
    // Logs
    configs.logs.console = (configs.logs.console === false) ? true : false;
    configs.logs.level = configs.logs.level || 'error';
    // Check parameters
    checkParams(configs);
    // Return configurations
    return configs;
  } catch(err) {
    console.error('Error on loading configurations.');
    console.error(err.stack);
    process.exit(1);
  }
}
