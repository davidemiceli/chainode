'use strict';

// Requirements
const fs = require('fs');
const crypto = require('crypto');
const RSA = require('../lib/rsa');

// Classes
const Peer = require('../classes/peer');

function MD5(text) {
  return crypto.createHash('md5').update(text).digest('hex')
}

// Blockchain SDK
module.exports = class {

  constructor(blockchain_id) {
    this.folder = 'data';
    this.setBlockchain(blockchain_id);
  }

  setBlockchain(blockchain_id) {
    this.blockchain_id = blockchain_id;
    this.blockchain_folder = blockchain_id ? this.composeBlockchainFolder(this.folder, blockchain_id) : null;
  }

  composeBlockchainFolder(folder, blockchain_id) {
    return `${folder}/${blockchain_id}`;
  }

  composePeersFilePath() {
    return `${this.blockchain_folder}/peers`;
  }

  getPeersData() {
    const peerspath = this.composePeersFilePath();
    const peersfiles = fs.readdirSync(peerspath);
    const peersdata = {};
    for (const peerfile of peersfiles) {
      const jsondata = fs.readFileSync(`${peerspath}/${peerfile}`, 'utf8');
      const peerid = peerfile.replace(/.json$/, '');
      peersdata[peerid] = JSON.parse(jsondata);
    }
    return peersdata;
  }

  getBlockgeneratorIdFrom(peersData) {
    for (const peerid in peersData) {
      if (peersData[peerid].blockgenerator) return peerid;
    }
    throw Error(`Missing block generator peer inside ${this.composePeersFilePath()}.`);
  }

  userInPeersFile(peer_id, peersData) {
    return peersData[peer_id];
  }

  generatePeerKeys() {
    const peerid = MD5(`peer-${Date.now()}-${Math.random()}-${Math.random()}`);
    RSA.generateKeys(`${this.blockchain_folder}/keys`, peerid);
    return peerid;
  }

  addPeerFile(peer) {
    const peerspath = this.composePeersFilePath();
    const peerjson = `${peerspath}/${peer.id}.json`;
    fs.writeFileSync(peerjson, JSON.stringify(peer, null, 2));
  }

  generatePeer(peer) {
    peer.id = this.generatePeerKeys();
    peer.pub = fs.readFileSync(`${this.blockchain_folder}/keys/public/${peer.id}.pem`, 'utf8');
    const blockchain_folder = this.createDataFolders(this.blockchain_id);
    this.addPeerFile(peer);
    return peer;
  }

  createDataFolders(blockchain_id) {
    const blockchain_folder = this.composeBlockchainFolder(this.folder, blockchain_id);
    if (!fs.existsSync(this.folder)) fs.mkdirSync(this.folder);
    if (!fs.existsSync(blockchain_folder)) {
      fs.mkdirSync(blockchain_folder);
      fs.mkdirSync(`${blockchain_folder}/peers`);
      fs.mkdirSync(`${blockchain_folder}/keys`);
      fs.mkdirSync(`${blockchain_folder}/keys/public`);
      fs.mkdirSync(`${blockchain_folder}/keys/private`);
    }
    return blockchain_folder;
  }

  addNewBlockchain() {
    const blockchain_id = MD5(`blockchain-${Date.now()}-${Math.random()}-${Math.random()}`);
    const blockchain_folder = this.createDataFolders(blockchain_id);
    this.blockchain_id = blockchain_id;
    this.blockchain_folder = blockchain_folder;
    return blockchain_id;
  }

  // Main methods
  create(peerurl) {
    console.log('Creating a new Blockchain...');
    const blockchain_id = this.addNewBlockchain();
    console.log('Blockchain created.\nAdding a new Block generator...');
    const peer = this.generatePeer({
      url: peerurl,
      blockgenerator: true
    });
    console.log('Block generator created.');
    console.log('Done.\n');
    console.log(`
    Store these informations to start the blockchain:

      Blockchain ID: ${this.blockchain_id}
      Block generator ID: ${peer.id}
    `);
    return {
      blockchain_id: blockchain_id,
      blockgenerator_id: peer.id
    };
  }

  addpeer(blockchain_id, peer_url) {
    console.log('Creating a new peer...');
    if (!blockchain_id) {
      throw Error(`Missing "blockchain_id" parameter.`);
    }
    this.setBlockchain(blockchain_id);
    const peer = this.generatePeer({url: peer_url});
    console.log('Done.\n');
    console.log(`
    Store this information to connect to an existing blockchain:
      Peer ID: ${peer.id}
    `);
    return peer.id;
  }

  start(blockchain_id, peer_id, port) {
    if (!peer_id) {
      throw Error(`Missing "peer_id" parameter.`);
    }
    if (!blockchain_id) {
      throw Error(`Missing "blockchain_id" parameter.`);
    }
    this.setBlockchain(blockchain_id);
    // Public keys of peers
    const peersData = this.getPeersData();
    if (!this.userInPeersFile(peer_id, peersData)) {
      throw Error(`Missing peer data inside ${this.composePeersFilePath()}.`);
    }
    // Get blockgenerator id
    const blockgenerator_id = this.getBlockgeneratorIdFrom(peersData);
    // Keys of the peer
    const publicKey = fs.readFileSync(`${this.blockchain_folder}/keys/public/${peer_id}.pem`, 'utf8');
    const privateKey = fs.readFileSync(`${this.blockchain_folder}/keys/private/${peer_id}.pem`, 'utf8');
    console.log(`Peer ${peer_id} is connecting to the blockchain ${this.blockchain_id}.`);
    return new Peer(peer_id, blockgenerator_id, publicKey, privateKey, peersData, port || 8333);
  }
};
