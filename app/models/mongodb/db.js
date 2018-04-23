'use strict';

// Requirements
const mongoose = require( 'mongoose' );
const configs = require('../../configs/configs');

const dbconfigs = configs.mongodb;

// Use default native promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
const dbURI = `mongodb://${dbconfigs.host}:${dbconfigs.port}/${dbconfigs.name}`;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  // console.log(`MongoDB connection open to ${dbURI}`);
});

mongoose.connection.on('error',function(err) {
  console.log('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', function() {
  console.log('MongoDB disconnected.');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('MongoDB disconnected through app termination.');
    process.exit(0);
  });
});


// Schemas
const LedgerSchema = mongoose.model('ledger', require('./schemas/ledger'));
const PeersSchema = mongoose.model('peers', require('./schemas/peers'));

// Export schemas
module.exports = {
  ledger: LedgerSchema,
  peers: PeersSchema
};
