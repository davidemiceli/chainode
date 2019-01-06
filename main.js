'use strict';
/*
  Entrypoint to run a peer
*/

// Requirements
const Chainode = require('./lib/sdk');
const errors = require('./lib/errors');
const loadConfigs = require('./lib/configs/loadConfigs');


// Run peer
const main = async () => {
  let logger;
  try {
    // Load configurations
    const configs = loadConfigs();
    // Init the peer
    const agent = new Chainode(configs);
    await agent.start();
    logger = agent.logger;
    return true;
  } catch(err) {
    await errors(logger, err);
  }
}

// Start peer
main()
.catch(err => {
  return console.error(err.stack);
});
