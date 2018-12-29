'use strict';
/*
  Entrypoint for the blockgenerator
*/

// Requirements
const Chainode = require('../sdk/index');
const errors = require(`../lib/errors`);

// Configurations
const configs = {
  blockchain: 'blockchain',
  role: 'blockgenerator',
  name: 'blockgenerator001',
  db: {
    type: 'mongodb',
    port: 27017,
    host: '172.25.255.20',
    dbname: 'blockchain'
  },
  webui: {
    enabled: true,
    port: process.env.WEBUI_PORT || 8080,
    logs: {
      type: process.env.LOGS || 'DEBUG'
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

// Run peer
const main = async () => {
  let broker;
  try {
    // Init the peer
    const blockgenerator = new Chainode(configs);
    await blockgenerator.start();
    return true;
  } catch(err) {
    await errors(broker, err);
  }
}

// Start peer
main()
.catch(err => {
  console.error(err.stack);
});
