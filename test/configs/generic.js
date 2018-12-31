'use strict';


// Configurations
module.exports = {
  blockchain: 'blockchain',
  // role: 'blockgenerator',
  // id: '0001',
  db: {
    type: 'mongodb',
    port: 27017,
    host: '172.25.255.20',
    dbname: 'blockchain'
  },
  broker: {
    transporter: [
      'nats://S3Cr3T0k3n!@172.25.255.10:4222',
      'nats://S3Cr3T0k3n!@172.25.255.11:4222',
      'nats://S3Cr3T0k3n!@172.25.255.12:4222'
    ],
    logger: "console",
    logLevel: "info",
    metrics: true,
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
      secret: '93f7db1df1f22a27c8b7cc609b9d5c9b7c1dba05e13f029a9e4612066c42775c86305e9d57c8c92cd30a789bc31ec011d135dc33508707c4e41512dc7502aeb8',
      expire: '5m'
    },
    admin: {
      usedb: false,
      user: 'admin',
      password: 'admin'
    }
  }
};
