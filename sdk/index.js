'use strict';
/*
  Entrypoint for the SDK
*/

// Requirements
const uuid4 = require('uuid/v4');
const initKafka = require('../lib/initKafka');
const logger = require('../lib/logger');
const errors = require(`../lib/errors`);
const selectDb = require('../lib/database/select');
const backend = require('../web-console/backend/server');
const {
  isValidBlock,
  generateNextBlock
} = require('../lib/block');
const { utcTimestamp } = require('../lib/helpers');


// Blockchain sdk
module.exports = class {

  // Init SDK
  constructor(configs) {
    // Check params
    if (!/^(blockgenerator|peer)$/.test(configs.role)) throw Error(`Invalid peer role ${configs.role}.`);
    this.configs = configs;
    const { role, id, logs } = this.configs;
    this.logger = logger(role, id, logs.level, logs.path, logs.console);
  }

  hasRole(r) {
    const { role } = this.configs;
    return role === r;
  }

  // Shutdown the peer broker and the web console
  async shutdown() {
    await this
      .stopWebConsole()
      .stop();
    return this;
  }

  // Start peer broker
  async start() {
    try {
      // Check params
      const {role, id, webui} = this.configs;
      this.logger.info(`Starting ${role} with id ${id}.`);

      // Get database model
      this.db = selectDb(this.configs.db, this.logger);
      
      // Get kafka consumer and producer
      const {consumer, producer} = await initKafka(this);
      this.consumer = consumer;
      this.producer = producer;

      // Init web console
      if (webui.enabled) {
        await this.startWebConsole();
      }
      this.logger.info(`The ${role} with id ${id} is ready.`);
      return this;
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Stop peer broker
  async stop() {
    return this.consumer.close(function(err, res) {
      return this;
    });
  }

  // Start the Web Console
  async startWebConsole() {
    const {webui} = this.configs;
    this.webapp = await backend(webui, this, this.logger, this.db);
    return this;
  }

  // Stop Web Console
  stopWebConsole() {
    this.webapp && this.webapp.close();
    return this;
  }

  // Propose a block transaction
  async __produce(topic, data) {
    try {
      // Compose message
      const msg = {topic: topic, messages: data};
      // Produce message
      const self = this;
      return this.producer.send([msg], function(err, res) {
        if (err) throw Error(err);
        self.logger.debug('Produced to', res);
        return self;
      });
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Serialize data
  serialize(data) {
    return JSON.stringify(data);
  }

  // Deserialize data
  deserialize(data) {
    return JSON.parse(data);
  }

  // Select action based on message and topic
  async onMessage(topic, data) {
    const deserialized = this.deserialize(data);
    switch(topic) {
      case this.configs.kafka.topics.pending:
        if (this.hasRole('blockgenerator')) {
          return await this.addBlock(deserialized);
        }
        return false;
      case this.configs.kafka.topics.ledger:
        if (this.hasRole('peer')) {
          return await this.receiveLedgerBlock(deserialized);
        }
        return false;
      default:
        return false;
    }
  }

  // Propose a block transaction
  async propose(data) {
    try {
      // Get topic
      const topic = this.configs.kafka.topics.pending;
      const proposed = {
        id: uuid4(),
        proposedTime: utcTimestamp(),
        value: this.serialize(data)
      };
      const serialized = this.serialize(proposed);
      await this.__produce(topic, serialized);
      return true;
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Add a block to the ledger
  async addBlock(data) {
    try {
      // Item data
      const {id, proposedTime, value} = data;
      // Get db model instance
      const db = this.db;
      // Generate block using previous block
      const newblock = generateNextBlock(id, proposedTime, value);
      this.logger.info(`Building a block for the transaction ${newblock.hash} sended by ${this.configs.id}.`);
      this.logger.debug('Built new block', newblock);
      // Store block on db
      await db.Ledger.AddBlock(newblock);
      this.logger.info(`Block #${newblock.index} ${newblock.hash} was added to the ledger.`);
      // Publish block
      const topic = this.configs.kafka.topics.ledger;
      const serialized = this.serialize(newblock);
      await this.__produce(topic, serialized);
      // Return the new block
      return newblock.hash;
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Receive new block from the ledger
  async receiveLedgerBlock(data) {
    try {
      // Get db model instance
      const db = this.db;
      // Check if block is valid
      const valid = isValidBlock(this.logger, data);
      if (!valid) {
        const invalidMsg = (data && data.hash && data.id) ? `Found an invalid block ${data.hash} with id ${data.id}.` : 'Received an invalid block.';
        this.logger.error(invalidMsg);
        return false;
      }
      this.logger.info(`Received the block ${data.hash} with id ${data.id}.`);
      // Store block on db
      await db.Ledger.AddBlock(data);
      this.logger.debug('Added new block:', data);
      // Return the new block
      return data.hash;
    } catch(err) {
      errors(this.logger, err);
    }
  }

}
