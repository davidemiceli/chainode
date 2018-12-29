'use strict';

// Requirements
const mongoose = require('mongoose');
const CounterModel = require('./methods/counter');
const LedgerModel = require('./methods/ledger');


// MongoDB database model
module.exports = (configs, logger) => {

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
    logger.info('MongoDB connected.');
  });
  
  mongoose.connection.on('error', function(err) {
    logger.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', function() {
    logger.info('MongoDB disconnected.');
  });
  
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      logger.info('MongoDB disconnected through app termination.');
      process.exit(0);
    });
  });

  // Schemas
  const CounterSchema = mongoose.model('counter', require('./schemas/counter'));
  const LedgerSchema = mongoose.model('ledger', require('./schemas/ledger'));

  // Database
  const db = {
    counter: CounterSchema,
    ledger: LedgerSchema
  };

  // Models
  const Counter = new CounterModel(db);
  const Ledger = new LedgerModel(db);

  return {
    Counter,
    Ledger
  };
}
