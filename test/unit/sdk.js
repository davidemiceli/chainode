'use strict';

// Requirements
const expect = require("chai").expect;
const Chainode = require('../../sdk/index');
const loadConfigs = require('../../lib/loadConfigs');
const { generateNextBlock } = require('../../lib/block');

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
    const res = await agent.start();
    expect(res).instanceOf(Chainode);
  }).timeout(5*1000);

  it('propose a new block for the ledger', async () => {
    const data = [
      `Hello test ${Math.random()}`,
      {ok: 'test', num: Math.random()}
    ];
    for (const item of data) {
      const res = await agent.sendNewBlock(item);
      expect(res).to.be.a('string');
    }
  });

  it('adds a block to the ledger', async () => {
    const data = Math.random();
    const { organization } = agent.configs;
    const serialized = agent.serialize(data);
    const newblock = generateNextBlock(organization, serialized);
    const res = await agent.addBlockToLedger(newblock);
    expect(res).to.be.a('string');
  });

  after(async () => {
    await agent.shutdown();
    process.exit();
  });
});
