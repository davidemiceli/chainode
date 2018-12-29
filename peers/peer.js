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
  blockchain: 'blockchain',
  role: 'peer',
  name: process.env.PEER_ID || 'peer001',
  db: {
    type: 'mongodb',
    port: process.env.DB_PORT || 27017,
    host: process.env.DB_HOST,
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

const delay = time => new Promise(res => setTimeout(() => res(), time));

const act = async peer => {
  try {
    const seconds = _.random(0, 5);
    await delay(seconds * 1000);
    const items = _.random(1, 100);
    for (let i=0; i<items; i++) {
      const n = Math.random().toString(36).substring(7);
      await peer.propose(`Item ${n}`);
    }
  } catch(err) {
    peer.logger.error(err.stack);
  } finally {
    return await act(peer);
  }
}


// Run peer
const main = async () => {
  let broker;
  try {
    // Init the peer
    const peer = new Chainode(configs);
    await peer.start();
    // await act(peer);
    // for (let i=0; i<30; i++) {
    //   const n = Math.random();
    //   await peer.propose(`Hello ${n}!`);
    // }
    setInterval(async () => {
      await peer.synchronizeBlocks(1000);
    }, 5*60*1000);
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
