'use strict';


// Configurations
module.exports = {
  blockchain: 'blockchain',
  role: 'blockgenerator',
  id: '0000',
  db: {
    type: 'mongodb',
    port: 27017,
    host: '172.25.255.20',
    dbname: 'blockchain'
  },
  kafka: {
    hosts: [
      '172.25.255.61:9092'
    ],
    partitionsPerTopic: 3,
    topics: {
      pending: 'blockchain.blocks.pending',
      ledger: 'blockchain.blocks.ledger'
    },
    consumer: {
      groupId: 'company.role.uuid4',
      autoCommit: true,
      encoding: 'utf8',
      keyEncoding: 'utf8'
    },
    producer: {
      partitionerType: 2
    }
  },
  webui: {
    enabled: true,
    host: '172.25.255.50',
    port: 8080,
    jwt: {
      secret: '93f7db1df1f22a27c8b7cc609b9d5c9b7c1dba05e13f029a9e4612066c42775c86305e9d57c8c92cd30a789bc31ec011d135dc33508707c4e41512dc7502aeb8',
      expire: '5m'
    },
    admin: {
      usedb: false,
      user: 'admin',
      password: 'admin'
    }
  },
  logs: {
    level: 'debug',
    console: true,
    path: './logs'
  }
};
