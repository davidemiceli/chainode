'use strict';

// Requirements
const logformatter = require('../lib/logformatter');
const uuidv4 = require('uuid/v4');
const BroadcastStrategy = require('../lib/services/broadcastStrategy');


// Parameters
const BLOCKCHAIN = process.env.BLOCKCHAIN || 'blockchain';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || 1);
const QUEUE_SIZE = parseInt(process.env.QUEUE_SIZE || 100);


// Task configurations
module.exports = (nodeID) => ({
  // hotReload: true, // Disabe it when in production
  nodeID: nodeID || uuidv4(),
  namespace: BLOCKCHAIN,
  transporter: require('../lib/getNatsServer')(4222, 'S3Cr3T0k3n!'),
  logger: "console",
  logLevel: "info",
  logFormatter(level, args, bindings) {
    return logformatter(level, args, bindings)
  },
  metrics: true,
  requestTimeout: 5 * 1000, // in seconds
  requestRetry: 0,
  registry: {
    strategy: "RoundRobin"
    // strategy: BroadcastStrategy
  },
  retryPolicy: {
    enabled: true,
    retries: 3,
    delay: 100,
    maxDelay: 2000,
    factor: 2,
    check: err => err && !!err.retryable
  },
  circuitBreaker: {
    enabled: false,
    threshold: 0.5,
    minRequestCount: 5,
    windowTime: 60, // in seconds
    halfOpenTime: 5 * 1000, // in milliseconds
    check: err => err && err.code >= 500
  },
  // Service allowed concurrency and queque size
  bulkhead: {
    enabled: true,
    concurrency: CONCURRENCY,
    maxQueueSize: QUEUE_SIZE,
  }
});
