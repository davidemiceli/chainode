'use strict';

/*
  Default configurations
*/


module.exports = {
  broker: {
    logger: "console",
    logLevel: "info",
    metrics: false,
    requestTimeout: 5 * 1000, // in seconds
    requestRetry: 0,
    retryPolicy: {
      enabled: true,
      retries: 3,
      delay: 100,
      maxDelay: 2000,
      factor: 2
    },
    circuitBreaker: {
      enabled: false,
      threshold: 0.5,
      minRequestCount: 5,
      windowTime: 60, // in seconds
      halfOpenTime: 5 * 1000 // in milliseconds
    },
    // Service allowed concurrency and queque size
    bulkhead: {
      enabled: true,
      concurrency: 1,
      maxQueueSize: 1500,
    }
  },
  webui: {
    enabled: true,
    port: 8080,
    logs: {
      type: 'DEBUG'
    },
    jwt: {
      secret: '58cae43479d0403dad5908a61b0460105f4c45699acd43ccae568157b3153a920242a2bc09d54af4aa04c830b308ba0c',
      expire: '5m'
    },
    admin: {
      usedb: false,
      user: 'admin',
      password: 'admin'
    }
  }
};
