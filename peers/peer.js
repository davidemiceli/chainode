'use strict';
/*
  Entrypoint for the peer
*/

// Requirements
const _ = require('lodash');
const Chainode = require('../sdk/index');
const errors = require(`../lib/errors`);

// Configurations
const configs = {
  type: 'peer',
  name: process.env.PEER_ID || 'peer001',
  db: {
    type: 'mongodb',
    port: process.env.DB_PORT || 27017,
    host: process.env.DB_HOST,
    dbname: 'blockchain'
  }
};

// Run peer
const main = async () => {
  let broker;
  try {
    // Init the peer
    const peer = new Chainode(configs);
    await peer.start();
    peer.logger.info('Hello peer!');
    await peer.synchronizeBlocks(1000);
    for (let i=0; i<30; i++) {
      const n = Math.random();
      await peer.propose(`Hello ${n}!`);
    }
    setInterval(async () => {
      // const c = _.random(1, 5);
      // for (let i=0; i<c; i++) {
      //   const n = Math.random().toString(36).substring(7);
      //   await peer.propose(`Test ${n}`);
      // }
      await peer.synchronizeBlocks(1000);
    }, 60*1000);
    // await peer.shutdown();
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
