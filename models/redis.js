'use strict';

// Requirements
const util = require('util');
const bluebird = require('bluebird');
const redis = require("redis");

const redis_client = redis.createClient();

redis_client.on("error", function(err) {
  console.error(err);
  return err;
});

bluebird.promisifyAll(Object.getPrototypeOf(redis_client));

module.exports = redis_client;
