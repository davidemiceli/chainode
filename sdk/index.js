'use strict';
/*
  Entrypoint for the Block Generator peer
*/

// Requirements
const events = require('events');
const Broker = require('../lib/broker');
const errors = require(`../lib/errors`);
const { syncBlocks } = require('../lib/block');
const backend = require('../web-console/backend/server');


// Blockchain sdk
module.exports = class {

  // Init SDK
  constructor(configs) {
    // Check params
    if (!/^(blockgenerator|peer)$/.test(configs.role)) throw Error(`Invalid peer role ${configs.role}.`);
    this.configs = configs;
    this.__events = new events.EventEmitter();
    this.__events.on('sync', this.synchronizeBlocks.bind(this));
  }

  // Shutdown the peer broker
  async shutdown() {
    this
      .stopWebConsole()
      .stop();
    return this;
  }

  // Start peer broker
  async start() {
    try {
      // Check params
      const {role, name, webui} = this.configs;
      // Init the broker
      const broker = await Broker(role, this.configs);
      broker.logger.info(`Starting ${role} with name ${name}.`);
      this.__broker = broker;
      this.logger = broker.logger;
      if (webui.enabled) {
        await this.startWebConsole();
      }
      if (role === 'blockgenerator') {
        this.__broker.setStatus.active();
      } else {
        await this.synchronizeBlocks();
      }
      return this;
    } catch(err) {
      await errors(this.logger, err);
    }
  }

  // Stop peer broker
  async stop() {
    this.__broker && await this.__broker.stop();
    return this;
  }

  // Start the Web Console
  async startWebConsole() {
    const {webui} = this.configs;
    this.webapp = await backend(webui, this, this.logger, this.__broker.DB);
    return this;
  }

  // Stop Web Console
  stopWebConsole() {
    this.webapp && this.webapp.close();
    return this;
  }

  // Sync missing blocks
  async synchronizeBlocks(timing) {
    try {
      timing = timing || 1000;
      if (this.__broker.onStatus('sync')) return;
      this.__broker.setStatus.sync();
      this.logger.info(`Starting block synchronization...`);
      await syncBlocks(this.__broker, timing);
      this.logger.info(`Block synchronization completed.`);
      this.__broker.setStatus.active();
      return this;
    } catch(err) {
      await errors(this.logger, err);
    }
  }

  // Start block synchronization in background
  async synchronizeBlocksAsync(timing) {
    try {
      this.__events.emit('sync', timing);
      return this;
    } catch(err) {
      await errors(this.logger, err);
    }
  }

  // Propose a block transaction
  async propose(data) {
    try {
      if (this.__broker.onStatus('sync')) {
        throw Error('Peer can not propose a block during synchronisation.');
      }
      await this.__broker.call('blockgenerator.transaction.add', data);
      return this;
    } catch(err) {
      await errors(this.logger, err);
    }
  }

}
