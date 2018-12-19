'use strict';
/*
  Entrypoint for the peer
*/

// Requirements
const Broker = require('../lib/broker');
const errors = require(`../lib/errors`);


// Run peer
const main = async () => {
  let broker;
  try {
    // Init the broker
    broker = await Broker('peer001', 'peer');
    broker.logger.info('Hello peer!');
    for (let i=0; i<80; i++) {
      await broker.call('blockgenerator.transaction.add', `Hello ${Math.random()}!`);
    }
    broker.emit('$block.sync', {timing: 1000});
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
