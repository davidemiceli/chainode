'use strict';
/*
  Integration Tests
*/

// Requirements
const axios = require('axios');
const expect = require("chai").expect;
const bluebird = require('bluebird');
const Chainode = require('../sdk/index');


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

describe('Should handle the blocks and the ledger', () => {

  it('check the status of the APIs', async () => {
    for (const a of Object.values(Actors)) {
      const res = await APIs('GET', a.url, 'api');
      expect(res).to.deep.equal({status: 'active'});
    }
  });

  it('make blockgenerator show the latest blocks', async () => {
    const res = await APIs('POST', Actors.blockgenerator.url, 'api/block/list', {});
    expect(res).to.be.an('array');
  });

  it('make peer propose a block to the blockgenerator', async () => {
    for (let i=0; i<1*6; i++) {
      const data = {
        data: `Hello ${i}-${Math.random()}!`
      };
      const res = await APIs('POST', Actors.peer001.url, 'api/block/propose', data);
      expect(res).to.be.true;
    }
  });

  it('make peer synchronize blocks', async () => {
    const res = await APIs('POST', Actors.peer001.url, 'api/block/sync', {});
    expect(res).to.be.true;
  }).timeout(100*1000);

  it('make blockgenerator check again the latest blocks after the last blocks were added', async () => {
    const res = await APIs('POST', Actors.blockgenerator.url, 'api/block/list', {});
    expect(res).to.be.an('array').to.be.not.empty;
  }).timeout(10*1000);

});
