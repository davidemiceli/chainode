/*
  Integration Tests
*/

// Requirements
const expect = require("chai").expect;
const bluebird = require('bluebird');
const chainode = require('../sdk/blockchain');
const Routes = require('../app/routes');

// Constants
const Actors = {
  blockgenerator: {
    sdk: null,
    data: null,
    url: 'http://10.5.0.2',
    api_key: '61f48dea3d1f9cbfaea9ca01ed8f8681-1525626679999',
    api_secret: 'b49c9b0d76308fcaf1c8d30e722474233855eb3a3ca468e414b9f0691225ab98'
  },
  peer_001: {
    sdk: null,
    data: null,
    url: 'http://10.5.0.3',
    api_key: '61f48dea3d1f9cbfaea9ca01ed8f8681-1525626679999',
    api_secret: 'b49c9b0d76308fcaf1c8d30e722474233855eb3a3ca468e414b9f0691225ab98'
  }
};

describe('Should initialize the SDK client', function() {
  it('Should create the Block Generator SDK instance', function() {
    Actors.blockgenerator.sdk = new chainode({
      url: Actors.blockgenerator.url,
      blockgenerator: Actors.blockgenerator.url,
      api_key: Actors.blockgenerator.api_key,
      api_secret: Actors.blockgenerator.api_secret
    });
    expect(Actors.blockgenerator.sdk).to.be.an('object');
  });

  it('Should create the Peer SDK instance', function() {
    Actors.peer_001.sdk = new chainode({
      url: Actors.peer_001.url,
      blockgenerator: Actors.blockgenerator.url,
      api_key: Actors.peer_001.api_key,
      api_secret: Actors.peer_001.api_secret
    });
    expect(Actors.peer_001.sdk).to.be.an('object');
  });

  it('Should authenticate Block Generator client', async function() {
    const resp = await Actors.blockgenerator.sdk.auth();
    expect(resp).to.equal(true);
  });

  it('Should authenticate Peer client', async function() {
    const resp = await Actors.peer_001.sdk.auth();
    expect(resp).to.equal(true);
  });
});

describe('Should manage peers', function() {
  it('Should create a new Blockchain and a Block Generator peer', async function() {
    expect(Actors.blockgenerator.sdk).to.be.an('object');
    const resp = await Actors.blockgenerator.sdk.api(Routes.PEER.NEW, {
      type: "blockgenerator",
      url: Actors.blockgenerator.url
    });
    Actors.blockgenerator.data = resp;
    expect(resp).to.have.property('id');
  }).timeout(100*1000);

  it('Should create a new Peer', async function() {
    expect(Actors.peer_001.sdk).to.be.an('object');
    const resp = await Actors.peer_001.sdk.api(Routes.PEER.NEW, {
      type: "peer",
      url: Actors.peer_001.url
    });
    Actors.peer_001.data = resp;
    expect(resp).to.have.property('id');
  }).timeout(100*1000);

  it('Should subscribe the peer to the blockgenerator (to join on the blockchain)', async function() {
    const resp = await Actors.peer_001.sdk.api(Routes.PERMISSION.JOIN.ASK, {
      blockgenerator_url: Actors.blockgenerator.url
    });
    expect(resp).to.equal(true);
  }).timeout(10*1000);

  it('Block Generator should see all the pending peers that made request to join', async function() {
    const resp = await Actors.blockgenerator.sdk.api(Routes.PEER.LIST.PENDING);
    expect(resp).to.be.an('array').that.is.not.empty;
  }).timeout(10*1000);

  it('The blockgenerator should approve a peer to join', async function() {
    const resp = await Actors.blockgenerator.sdk.api(Routes.PERMISSION.JOIN.APPROVE, {
      url: Actors.peer_001.url
    });
    expect(resp).to.equal(true);
  }).timeout(10*1000);

  it('The blockgenerator should see all the approved peers of the blockchain network', async function() {
    const resp = await Actors.blockgenerator.sdk.api(Routes.PEER.LIST.JOINED);
    expect(resp).to.be.an('array').that.is.not.empty;
  }).timeout(10*1000);

  it('The peer should see the blockgenerator it has joined', async function() {
    const resp = await Actors.peer_001.sdk.api(Routes.PERMISSION.JOINED);
    expect(resp).to.be.an('object');
  }).timeout(10*1000);

});

describe('Should handle the blocks and the ledger', function() {
  it('The blockgenerator should see the latest blocks', async function() {
    const resp = await Actors.blockgenerator.sdk.api(Routes.BLOCKS.LATEST);
    expect(resp).to.be.an('array');
  });

  it('The Peer should propose a block to the blockgenerator', async function() {
    const resp = await Actors.peer_001.sdk.api(Routes.TRANSACTION.PROPOSE, {
      data: {hello: 'This is a test block'}
    });
    expect(resp).to.equal(true);
  });

  it('The blockgenerator should see the latest blocks after the last one was added', async function() {
    await bluebird.delay(5*1000);
    const resp = await Actors.blockgenerator.sdk.api(Routes.BLOCKS.LATEST);
    expect(resp).to.be.an('array').that.is.not.empty;
  }).timeout(10*1000);

  it('The peer should propose many blocks to the blockgenerator', async function() {
    for (let i=0; i<5; i++) {
      const resp = await Actors.peer_001.sdk.api(Routes.TRANSACTION.PROPOSE, {
        data: {test: i, now: Date.now()}
      });
      expect(resp).to.equal(true);
    }
  });

  it('The blockgenerator should check again the latest blocks after the last blocks was added', async function() {
    await bluebird.delay(8*1000);
    const resp = await Actors.blockgenerator.sdk.api(Routes.BLOCKS.LATEST);
    expect(resp).to.be.an('array').that.is.not.empty;
  }).timeout(10*1000);

});
