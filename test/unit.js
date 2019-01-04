'use strict';

// Requirements
const expect = require('chai').expect;
const axios = require('axios');
const Chainode = require('../sdk/index');
const loadConfigs = require('../lib/loadConfigs');
const { generateNextBlock } = require('../lib/block');

// Set generic configs
process.env.CONFIGS = '../test/configs/generic.js';

let agent = null;
const peer = {url: ''};


// APIs client
const APIs = async (method, baseurl, endpoint, data) => {
  try {
    if (!/^(GET|POST)$/.test(method)) {
      throw Error('Invalid REST APIs method.');
    }
    endpoint = endpoint && endpoint.replace(/^\//, '');
    const apiMethod = method.toLowerCase();
    const fullApiUrl = `${baseurl}/${endpoint}`;
    const r = await axios[apiMethod](fullApiUrl, data);
    return r.data;
  } catch(e) {
    console.log(e.stack);
    throw e;
  }
}

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
  
    it('make peer propose a block to the blockgenerator', async () => {
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
