'use strict';
/*
  Integration Tests
*/

// Requirements
const axios = require('axios');
const expect = require("chai").expect;

// Timeout
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

// Constants
const Actors = {
  blockgenerator: {
    id: '000',
    url: 'http://172.25.255.51:8080'
  },
  peer001: {
    id: '001',
    url: 'http://172.25.255.52:8080'
  }
};

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
    throw e;
  }
}

// Integration tests
describe('Should handle the blocks and the ledger', () => {

  it('check the status of the APIs', async () => {
    for (const a of Object.values(Actors)) {
      const res = await APIs('GET', a.url, 'api');
      expect(res).to.deep.equal({status: 'active'});
    }
  }).timeout(10*1000);

  it('make blockgenerator show the latest blocks', async () => {
    const res = await APIs('POST', Actors.blockgenerator.url, 'api/block/list', {});
    expect(res).to.be.an('array');
  }).timeout(10*1000);

  it('make peer propose a block to the blockgenerator', async () => {
    for (let i=0; i<1*6; i++) {
      const data = {
        data: `Hello ${i}-${Math.random()}!`
      };
      const res = await APIs('POST', Actors.peer001.url, 'api/block/propose', data);
      expect(res).to.be.true;
    }
  }).timeout(30*1000);

  it('make blockgenerator check again the latest blocks after the last blocks were added', async () => {
    // Wait Kafka propagates messages to consumer
    await timeout(10);
    const res = await APIs('POST', Actors.blockgenerator.url, 'api/block/list', {});
    expect(res).to.be.an('array').to.be.not.empty;
  }).timeout(20*1000);

});
