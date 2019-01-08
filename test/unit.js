'use strict';

// Requirements
const expect = require('chai').expect;
const Chainode = require('../lib/sdk');
const loadConfigs = require('../lib/configs/loadConfigs');
const { generateNextBlock } = require('../lib/block');
const APIs = require('./lib/apis');


// Set generic configs
process.env.CONFIGS = process.env.CONFIGS || './test/configs/generic.json';

let agent = null;
const peer = {
  url: ''
};


// Integration tests
describe('should handle the blocks and the ledger', () => {

  before(() => {
    // Load configurations
    const configs = loadConfigs();
    // Disable console logs
    configs.logs.console = true;
    // Init the peer
    agent = new Chainode(configs);
    expect(agent).instanceOf(Chainode);
    // Set peer url
    const { host, port } = agent.configs.webui;
    peer.url = `http://${host}:${port}`;
    expect(peer.url).to.be.a('string').to.be.not.empty;
  });

  describe('sdk should propose blocks and add them to the ledger.', () => {

    it('starts the sdk peer agent', async () => {
      const res = await agent.start();
      expect(res).instanceOf(Chainode);
    }).timeout(5*1000);

    it('propose new blocks for the ledger', async () => {
      const data = [
        `Hello test ${Math.random()}`,
        JSON.stringify({ok: 'test', num: Math.random()})
      ];
      for (const item of data) {
        const res = await agent.sendNewBlock(item);
        expect(res).to.be.a('string');
      }
    });

    it('propose a not serialized block for the ledger raising an error', async () => {
      try {
        const data = {test: 123};
        await agent.sendNewBlock(data);
      } catch(err) {
        expect(err).to.be.an('error').with.property('message', 'Data is not serialized.');
      }
    });

    it('adds a valid block and an invalid one to the ledger', async () => {
      const data = Math.random();
      const { organization } = agent.configs;
      const serialized = agent.serialize(data);
      const newblock = generateNextBlock(organization, serialized);
      const res = await agent.addBlockToLedger(newblock);
      expect(res).to.be.a('string').to.be.equal(newblock.hash);
      newblock.data = 'I am not valid!';
      const res2 = await agent.addBlockToLedger(newblock);
      expect(res2).to.be.false;
    });

  });

  describe('should handle the blockchain via web-console APIs.', () => {
  
    it('check the status of the APIs', async () => {
      const res = await APIs('GET', peer.url, 'api');
      expect(res).to.deep.equal({status: 'active'});
    });
  
    it('make blockgenerator show the latest blocks', async () => {
      const res = await APIs('POST', peer.url, 'api/block/list', {});
      expect(res).to.be.an('array');
    });
  
    it('make peer propose blocks to the blockgenerator', async () => {
      for (let i=0; i<1*6; i++) {
        const data = {
          data: `Hello ${i}-${Math.random()}!`
        };
        const res = await APIs('POST', peer.url, 'api/block/propose', data);
        expect(res).to.be.true;
      }
    });
  
  });

  after(async () => {
    await agent.shutdown();
    process.exit();
  });
});
