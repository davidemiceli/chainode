'use strict';
/*
  Load and parse configurations
*/
// Requirements
const uuid4 = require('uuid/v4');
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

// Check params
const checkParams = configs => {
  if (!/^(peer)$/.test(configs.role)) throw Error(`Invalid peer role ${configs.role}.`);
  return true;
}


module.exports = () => {
  try {
    // Get configurations
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
    configs.db.type = process.env.DB_TYPE || configs.db.type;
    configs.db.host = process.env.DB_HOST || configs.db.host;
    configs.db.port = process.env.DB_PORT || configs.db.port;
    configs.db.dbname = process.env.DB_NAME || configs.db.dbname;
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
