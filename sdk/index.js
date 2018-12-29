'use strict';
/*
  Entrypoint for the Block Generator peer
*/

// Requirements
const Broker = require('../lib/broker');
const errors = require(`../lib/errors`);
const { syncBlocks } = require('../lib/block');
const backend = require('./web-console/backend/server');


// Blockchain sdk
module.exports = class {

  // Init SDK
  constructor(configs) {
    // Check params
    if (!/^(blockgenerator|peer)$/.test(configs.role)) throw Error(`Invalid peer role ${configs.role}.`);
    this.configs = configs;
  }

  // Shutdown the peer broker
  async shutdown() {
    if (this.__broker) await this.__broker.stop();
    return this;
  }

  // Start peer broker
  async start() {
    try {
      // Check params
      const {role, name, webui} = this.configs;
      // Init the broker
      const broker = await Broker(name, role, this.configs);
      broker.logger.info(`Starting ${role} with name ${name}.`);
      this.__broker = broker;
      this.logger = broker.logger;
      if (webui.enabled) {
        await this.startWebConsole();
      }
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

  // Start the Web Console
  async startWebConsole() {
    const {webui} = this.configs;
    this.webapp = await backend(webui, this.__broker, this.logger, this.__broker.DB);
  }

  // Stop Web Console
  stopWebConsole() {
    this.webapp && this.webapp.close();
  }

  // Sync missing blocks
  async synchronizeBlocks(timing) {
    try {
      timing = timing || 1000;
      this.__broker.logger.info(`Starting block synchronization...`);
      await syncBlocks(this.__broker, timing);
      this.__broker.logger.info(`Block synchronization completed.`);
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

  // Propose a block transaction
  async propose(data) {
    try {
      await this.__broker.call('blockgenerator.transaction.add', data);
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

}
