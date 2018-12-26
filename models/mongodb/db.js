'use strict';

// Requirements
const mongoose = require('mongoose');
const CounterModel = require('./methods/counter');
const LedgerModel = require('./methods/ledger');
const PeersModel = require('./methods/peers');


// MongoDB database model
module.exports = (configs, broker) => {

  // Get configs
  const { host, port, dbname } = configs;

  // Use default native promises
  mongoose.Promise = global.Promise;
  
  // Connect to MongoDB
  const dbURI = `mongodb://${host}:${port}/${dbname}`;
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  
  mongoose.connection.on('connected', function() {
    broker.logger.info('MongoDB connected.');
  });
  
  mongoose.connection.on('error', function(err) {
    broker.logger.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', function() {
    broker.logger.info('MongoDB disconnected.');
  });
  
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      broker.logger.info('MongoDB disconnected through app termination.');
      process.exit(0);
    });
  });

  // Schemas
  const CounterSchema = mongoose.model('counter', require('./schemas/counter'));
  const LedgerSchema = mongoose.model('ledger', require('./schemas/ledger'));
  const PeersSchema = mongoose.model('peers', require('./schemas/peers'));

  // Database
  const db = {
    counter: CounterSchema,
    ledger: LedgerSchema,
    peers: PeersSchema
  };

  // Models
  const Counter = new CounterModel(db);
  const Ledger = new LedgerModel(db);
  const Peers = new PeersModel(db);

  return {
    Counter,
    Ledger,
    Peers
  };
}
