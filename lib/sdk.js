'use strict';
/*
  Entrypoint for the SDK
*/

// Requirements
const initKafka = require('./kafka/initKafka');
const logger = require('./logger');
const errors = require(`./errors`);
const Db = require('./database/couchbase/db');
const backend = require('../web-console/backend/server');
const {
  isValidBlock,
  generateNextBlock
} = require('./block');


// Blockchain sdk
module.exports = class {

  // Init SDK
  constructor(configs) {
    this.configs = configs;
    const { role, id, logs } = this.configs;
    this.logger = logger(role, id, logs.level, logs.path, logs.console);
  }

  // Check the role
  hasRole(r) {
    const { role } = this.configs;
    return role === r;
  }

  // Shutdown the peer broker and the web console
  async shutdown() {
    await this.stopWebConsole()
    await this.stopConsumer();
    this.logger.close();
    return true;
  }

  // Start peer broker
  async start() {
    try {
      // Check params
      const {role, id, webconsole} = this.configs;
      this.logger.info(`Starting ${role} with id ${id}.`);

      // Get database model
      this.db = await Db(this.configs.db, this.logger);
      
      // Get kafka consumer and producer
      const {consumer, producer} = await initKafka(this);
      this.consumer = consumer;
      this.producer = producer;

      // Init web console
      if (webconsole.enabled) {
        await this.startWebConsole();
      }
      this.logger.info(`The ${role} with id ${id} is ready.`);
      return this;
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Stop peer broker
  stopConsumer() {
    if (!this.consumer) return Promise.resolve(true);
    const c = this.consumer;
    return new Promise(function(resolve, reject) {
      return c.close(true, function(err, res) {
        return resolve(true);
      });
    });
  }

  // Start the Web Console
  async startWebConsole() {
    const {webconsole} = this.configs;
    this.webConsole = await backend(webconsole, this, this.logger, this.db);
    return this;
  }

  // Stop Web Console
  stopWebConsole() {
    if (!this.webConsole) return Promise.resolve(true);
    const w = this.webConsole;
    return new Promise(function(resolve, reject) {
      return w.close(function(err, res) {
        return resolve(true);
      });
    });
  }

  // Produce message to a kafka topic
  async __produce(topic, data) {
    try {
      // Serialize data
      const serialized = this.serialize(data);
      // Compose message
      const msg = {topic: topic, messages: serialized};
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

  // Check if data is serialized
  isSerialized(data) {
    return typeof data === 'string';
  }

  // Select actions based on message and topic
  async onMessage(topic, data) {
    const { topics } = this.configs.kafka;
    const deserialized = this.deserialize(data);
    switch(topic) {
      case topics.pending:
        if (this.hasRole('peer')) {
          return await this.addBlockToLedger(deserialized);
        }
        return false;
      default:
        throw Error('Received message of an invalid topic');
    }
  }

  // Propose a new block
  async sendNewBlock(data) {
    try {
      // Check if data is serialized
      if (!this.isSerialized(data)) throw Error('Data is not serialized.');
      // Item data
      const { organization } = this.configs;
      // Generate block
      // const serializedData = this.serialize(data);
      const newblock = generateNextBlock(organization, data);
      this.logger.info(`Building a block for the transaction ${newblock.id} sended by organization ${organization}.`);
      this.logger.debug('Built new block', newblock);
      // Publish block
      const topic = this.configs.kafka.topics.pending;
      await this.__produce(topic, newblock);
      // Return the new block
      return newblock.id;
    } catch(err) {
      errors(this.logger, err);
    }
  }

  // Receive new blocks for adding to the ledger
  async addBlockToLedger(data) {
    try {
      // Get db model instance
      const db = this.db;
      // Check if block is valid
      const valid = isValidBlock(this.logger, data);
      if (!valid) {
        const invalidMsg = (data && data.id) ? `Skipping invalid block ${data.id}.` : 'Skipping an invalid block.';
        this.logger.error(invalidMsg);
        return false;
      }
      this.logger.debug(`Received block ${data.id}.`);
      // Store block on db
      await db.Ledger.AddBlock(data);
      this.logger.info(`Added new block ${data.id}.`);
      this.logger.debug('Added new block', data);
      // Return the new block
      return data.id;
    } catch(err) {
      errors(this.logger, err);
    }
  }

}
