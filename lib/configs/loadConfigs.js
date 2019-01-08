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
  return true;
}

// Get hosts
const getHosts = hosts => hosts ? hosts.replace(/^\s+/,'').split(',') : undefined;

// Handle database configurations
const handleDatabaseConfigs = configs => {
  // Database type
  configs.db.type = process.env.DB_TYPE || configs.db.type;
  // Database -> MongoDB
  if (configs.db.mongodb) {
    const dbConfs = configs.db.mongodb;
    dbConfs.host = process.env.DB_HOST || dbConfs.host;
    dbConfs.port = process.env.DB_PORT || dbConfs.port;
    dbConfs.dbname = process.env.DB_NAME || dbConfs.dbname;
  }
  // Database -> Cassandra
  if (configs.db.cassandra) {
    const dbConfs = configs.db.cassandra;
    dbConfs.hosts = getHosts(process.env.DB_HOSTS) || dbConfs.hosts;
    dbConfs.keyspace = process.env.DB_NAME || dbConfs.keyspace;
  }
}


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
    const defaultGroupId = `${configs.blockchain}.${configs.organization}.${configs.role}`;
    configs.kafka.consumer.groupId = process.env.GROUPID || configs.kafka.consumer.groupId || defaultGroupId;
    // Database
    handleDatabaseConfigs(configs);
    // Web Console
    configs.webui.host = process.env.WEBUI_HOST || configs.webui.host || 'http://localhost';
    configs.webui.port = process.env.WEBUI_PORT || configs.webui.port || 8080;
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
