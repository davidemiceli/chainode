'use strict';

// Requirements
const couchbase = require('couchbase');
const LedgerModel = require('./methods/ledger');


// Open couchbase bucket
const openBucket = (cluster, bucketname) => {
  return new Promise((resolve, reject) => {
      let bucket = cluster.openBucket(bucketname, function(err) {
          return err ? reject(err) : resolve(bucket);
      });
  });
}


// Couchbase database model
module.exports = async (configs, logger) => {

  // Get configs
  const {
    hosts,
    bucket,
    username,
    password
  } = configs;

  // Couchbase driver
  const listHosts = hosts.join(',');
  const cluster = new couchbase.Cluster(`couchbase://${listHosts}`);

  cluster.authenticate(username, password);
  const db = await openBucket(cluster, bucket);

  db.on('error', function(err) {
    logger.error(err.stack);
  });

  const q = couchbase.N1qlQuery;

  const Ledger = new LedgerModel(bucket, db, q);

  logger.info(`Couchbase client is ready (bucket ${bucket}) on ${listHosts}.`);

  return {
    Ledger
  };
}
