'use strict';
/*
  Integration Tests
*/

// Requirements
const path = require('path');
const expect = require("chai").expect;
const Chainode = require('../../sdk/index');
const loadConfigs = require('../../lib/loadConfigs');

// Set generic configs
process.env.CONFIGS = '../test/configs/generic.js';

let agent = null;

// Integration tests
describe('SDK should handle the blocks and the ledger', () => {

  before(() => {
    // Load configurations
    const configs = loadConfigs();
    // Disable console logs
    configs.logs.console = true;
    // Init the peer
    agent = new Chainode(configs);
    expect(agent).instanceOf(Chainode);
  });

  it('starts the sdk peer agent', async () => {
    // Init the peer
    const res = await agent.start();
    expect(res).instanceOf(Chainode);
  });

  it('proposes a block', async () => {
    // Init the peer
    const data = 'Hello test!';
    const res = await agent.propose(data);
    expect(res).to.be.true;
  });

  // Adds a block to the ledger
  // Receives new block from the ledger

  after(async () => {
    await agent.shutdown();
    process.exit();
  });
});
