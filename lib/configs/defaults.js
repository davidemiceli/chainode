'use strict';

/*
  Default configurations
*/


module.exports = {
  kafka: {
    topics: {
      pending: 'blockchain.blocks.pending',
      ledger: 'blockchain.blocks.ledger'
    },
    consumer: {
      autoCommit: true,
      encoding: 'utf8',
      keyEncoding: 'utf8'
    },
    producer: {
      partitionerType: 2
    }
  },
  webconsole: {
    enabled: true,
    port: 8080,
    jwt: {
      secret: '58cae43479d0403dad5908a61b0460105f4c45699acd43ccae568157b3153a920242a2bc09d54af4aa04c830b308ba0c',
      expire: '5m'
    },
    admin: {
      usedb: false,
      user: 'admin',
      password: 'admin'
    }
  },
  logs: {
    level: 'info',
    console: true,
    path: './logs'
  }
};
