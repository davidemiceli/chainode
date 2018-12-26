'use strict';
/*
  Entrypoint for the blockgenerator
*/

// Requirements
const Chainode = require('../sdk/index');
const errors = require(`../lib/errors`);

// Configurations
const configs = {
  type: 'blockgenerator',
  name: 'blockgenerator001',
  db: {
    type: 'mongodb',
    port: 27017,
    host: '172.25.255.20',
    dbname: 'blockchain'
  }
};

// Run peer
const main = async () => {
  let broker;
  try {
    // Init the peer
    const blockgenerator = new Chainode(configs);
    await blockgenerator.start();
    blockgenerator.logger.info('Hello blockgenerator!');
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
