'use strict';

// Requirements
const cassandra = require('cassandra-driver');
const LedgerModel = require('./methods/ledger');


// Cassandra database model
module.exports = (configs, logger) => {

  // Get configs
  const {
    hosts,
    keyspace,
    localDataCenter,
    consistency
  } = configs;

  // Cassandra driver
  const db = new cassandra.Client({
    contactPoints: hosts,
    localDataCenter: localDataCenter,
    keyspace: keyspace
  });

  // Models
  const qConsistency = cassandra.types.consistencies[consistency]
  const Ledger = new LedgerModel(db, qConsistency);

  logger.info(`Cassandra client ready (keyspace ${keyspace}).`);

  return {
    Ledger
  };
}
