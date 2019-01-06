'use strict';

// Requirements
const bluebird = require('bluebird');
const redis = require("redis");
const PeersModel = require('./peers');

const redisClient = redis.createClient({host: '172.25.255.30'});

redisClient.on("error", function(err) {
  console.error(err);
  return err;
});

bluebird.promisifyAll(Object.getPrototypeOf(redisClient));

// Models
const Peers = new PeersModel(redisClient);

module.exports = {
  Peers
};
