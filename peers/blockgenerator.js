'use strict';
/*
  Entrypoint for the Block Generator peer
*/

// Requirements
const Broker = require('../lib/broker');
const errors = require(`../lib/errors`);

// Run peer
const main = async () => {
  let broker;
  try {
    // Init the broker
    broker = await Broker('blockgenerator001', 'blockgenerator');
    broker.logger.info('Hello block generator!');
    return true;
  } catch(err) {
    await errors(broker, err);
  }
}

// Start peer
main()
.catch(err => {
  console.error(err);
});