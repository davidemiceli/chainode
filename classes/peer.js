'use strict';

// Requirements
const fs = require('fs');
const clientio = require('socket.io-client');
const CRYPT = require('../lib/crypt');

// Classes
const Blockchain = require('./blockchain');

// Peer class
module.exports = class {

  constructor(id, blockgenerator, publicKey, privateKey, peers, port) {
    // Block generator variables
    this.queque = [];
    this.proposed = {};
    // Peers variables
    this.blockchain = new Blockchain();
    this.status = 'active';
    this.id = id;
    this.blockgenerator = blockgenerator;
    this.keys = {
      private: privateKey,
      public: publicKey
    };
    this.peers = peers;
    this.socket = {};

    // Connect to P2P network
    this.initConnection(port);
  }

  getId() {
    return String(this.id);
  }

  startServer(peer_port) {
    const that = this;
    const app = require('express')();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    this.io = io;
    this.service = http.listen(peer_port, function () {
      console.log(`Peer ${that.getId()} listening on port ${peer_port}`);
    });
  }

  initServer(peerid) {
    const that = this;
    // P2P Server
    this.io.on('connection', function(socket) {
      that.socket[peerid] = socket;

      // Handle disconnect
      socket.on('disconnect', function() {
        // console.log(`disconnection.`);
      });

      // Peers actions
      if (that.getId() === that.blockgenerator) {

        // Block generator actions
        socket.on('propose', function(key, iv, message) {
          // Qui realmente riceve
          const msg = CRYPT.decrypt(that.keys.private, key, iv, message);
          if (!msg) return;
          that.receivePropose(msg);
        });

      } else {

        // General peer actions
        socket.on('new block', function(key, iv, message) {
          if (that.status === 'sync' || that.status === 'sleep') return;
          const msg = CRYPT.decrypt(that.keys.private, key, iv, message);
          if (!msg) return;
          that.handleBlock(msg);
        });

      }

      // Common peer actions
      socket.on('asked to sync blocks', function(key, iv, message) {
        if (that.status === 'sync') return;
        const msg = CRYPT.decrypt(that.keys.private, key, iv, message);
        if (!msg) return;
        that.handleAskedToSync(msg);
      });

      socket.on('block history', function(key, iv, message) {
        if (that.status != 'sync') return;
        const msg = CRYPT.decrypt(that.keys.private, key, iv, message);
        if (!msg) return;
        that.handleBlockHistory(msg);
      });

    });
  }

  initConnection(port) {
    // Start peer server
    this.startServer(port);
    this.initServer(this.id);
    // Connect to servers of the other peers
    this.connectToPeers();
  }

  connectToPeers() {
    // Start peer client
    for (const peerid in this.peers) {
      if (peerid === this.id) continue;
      this.connectTo(peerid, this.peers[peerid]);
    }
  }

  connectTo(peerid, peer) {
    const that = this;
    // P2P Client
    // const peer_url = /^http:\/\/localhost$/.test(peer.url) ? `${peer.url}:${peer.port}` : peer.url;
    this.socket[peerid] = clientio.connect(peer.url, {reconnect: true});
    this.socket[peerid].on('connect', function() {
      // console.log(`Peer ${that.getId()} connected with ${peerid} (${peer.url})!`);
    });
  }

  comunicate(peerid, channel, message) {
    message.sender = this.getId();
    const pubKey = this.peers[peerid].pub;
    const encrypteditems = CRYPT.encrypt(pubKey, message);
    this.socket[peerid].emit(channel, encrypteditems.key, encrypteditems.iv, encrypteditems.msg);
  }

  broadcast(channel, message) {
    for (const peerid in this.peers) {
      this.comunicate(peerid, channel, message);
    }
  }

  // Block generator peer methods
  receivePropose(message) {
    console.log(`The Block Generator put transaction ${message.hash} in the queque.`);
    delete message.sender;
    this.queque.push(message);
  }

  handlePropose() {
    // this.queque.sort((a, b) => a.time - b.time);
    this.proposed = this.queque.shift();
    console.log(`The Block Generator si building the block for the transaction ${this.proposed.hash}`);
    const newBlock = this.blockchain.generateNextBlock(this.proposed);
    const BlockWasStored = this.blockchain.addBlock(newBlock);
    if (BlockWasStored) {
      console.log(`The new block has the hash ${newBlock.hash} from transaction ${this.proposed.hash}`);
      this.broadcast('new block', {
        data: this.proposed,
        block: newBlock
      });
    }
  }

  askForNextBlock() {
    if (this.queque[0]) {
      this.handlePropose();
    }
    const that = this;
    setTimeout(function() {
      return that.askForNextBlock();
    }, 10*1000);
  }

  // General peers methods
  propose(data) {
    const pendingBlock = this.blockchain.generatePendingData(data);
    console.log(`The peer ${this.getId()} propose to add the transaction:`, pendingBlock.hash);
    this.comunicate(this.blockgenerator, 'propose', pendingBlock);
  }

  askSync() {
    const latestBlock = this.blockchain.getLatestBlock();
    this.comunicate(this.blockgenerator, 'asked to sync blocks', {hash: latestBlock.hash});
  }

  handleAskedToSync(message) {
    // console.log(`Peer ${message.sender} asked synchronization to ${this.getId()}.`);
    const latestBlocks = this.blockchain.getLastBlocksFromHash(message.hash);
    this.comunicate(message.sender, 'block history',{
      hash: message.hash,
      blocks: latestBlocks
    });
  }

  handleBlockHistory(message) {
    console.log(`Peer ${this.getId()} started synchronization.`);
    for (const oneblock of message.blocks) {
      const newBlock = this.blockchain.generateNextBlock(oneblock.data);
      if (newBlock.hash === oneblock.hash) {
        this.blockchain.addBlock(newBlock);
      } else {
        console.log(`Peer ${this.getId()} found inconsistent blocks during synchronization.`);
        return;
      }
    }
    console.log(`Blocks of peer ${this.getId()} successfully synchronized.`);
    this.status = 'active';
  }

  handleBlock(message) {
    const newBlock = this.blockchain.generateNextBlock(message.data);
    const isValidHash = (message.block.hash === newBlock.hash);
    if (isValidHash) {
      const BlockWasStored = this.blockchain.addBlock(newBlock);
      if (BlockWasStored) {
        // console.log(`Peer ${this.getId()} added ${message.block.hash} from transaction ${message.data.hash}`);
      }
    } else {
      this.status = 'sync';
      console.log(`Peer ${this.getId()} found a diverged block: try synchronization.`);
      this.askSync();
    }
  }

};
