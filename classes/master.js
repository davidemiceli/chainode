'use strict';

// Requirements
const fs = require('fs');
const moment = require('moment');
const RSA = require('../lib/rsa');

// Classes
const Blockchain = require('./blockchain');

// Master peer class
module.exports = class {

  constructor(serverid, publicKey, privateKey, peers) {
    this.blockchain = new Blockchain();
    this.queque = [];
    this.proposed = {};
    this.id = serverid;
    this.keys = {
      private: privateKey,
      public: publicKey
    };
    this.peers = peers;
    this.port = this.peers[this.id].port;

    // Initialize p2p server
    this.startServer(this.port);
    this.initServer();
  }

  startServer(peer_port) {
    const that = this;
    const app = require('express')();
    const http = require('http').Server(app);
    this.io = require('socket.io')(http);
    http.listen(peer_port, function () {
      console.log(`Peer ${that.getId()} listening on port ${peer_port}`);
      that.askForNextBlock();
    });
  }

  getId() {
    return this.id;
  }

  getClients(io) {
    const rawclients = this.io.sockets.clients();
    const clients = {};
    let num = 0;
    for (const clientid in rawclients.sockets) {
      clients[clientid] = true;
      num += 1;
    }
    return {
      num: num,
      clients: clients
    };
  }

  updateConnected(io, socket) {
    this.broadcast('peers', this.getClients(io));
  }

  initServer() {
    const that = this;
    this.io.on('connection', function(socket) {

      console.log(`${socket.id} connected.`);
      // that.updateConnected(that.io, socket);

      that.socket = socket;

      // Handle disconnect
      socket.on('disconnect', function() {
        console.log(`${socket.id} disconnected.`);
        // that.updateConnected(that.io, socket);
      });

      // Actions
      socket.on('propose', function(message) {
        // console.log('sended to server =>', from, ' saying ', msg);
        const msg = JSON.parse(that.decrypt(message));
        that.receivePropose(msg);
      });

      socket.on('sync', function(message) {
        // console.log('sended to server =>', from, ' saying ', msg);
        const msg = JSON.parse(that.decrypt(message));
        that.handleSync(from, msg);
      });

    });
  }

  decrypt(message) {
    return RSA.decrypt(this.keys.private, message);
  }

  broadcast(channel, message) {
    // this.socket.broadcast.emit(channel, message);
    // Qui poi inserire un loop verso ogni peer e criptando ogni messaggio con la chiave pubblica del peer
    this.io.emit(channel, message);
  }

  receivePropose(message) {
    console.log(`The master node put transaction ${message.hash} in the queque.`);
    this.queque.push(message);
  }

  handlePropose() {
    // this.queque.sort((a, b) => a.time - b.time);
    this.proposed = this.queque.shift();
    console.log(`The master peer si building the block for the transaction ${this.proposed.hash}`);
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

  handleSync(to, message) {
    console.log(`Peer ${to} asked synchronization.`);
    const latestBlocks = this.blockchain.getLastBlocksFromHash(message.hash);
    this.broadcast(to, {
      action: 'block history',
      hash: message.hash,
      blocks: latestBlocks
    });
  }

  askForNextBlock() {
    // console.log('askForNextBlock()', 'this.waiting =', this.waiting)
    if (this.queque[0]) {
      this.handlePropose();
    }
    const that = this;
    setTimeout(function() {
      return that.askForNextBlock();
    }, 10*1000);
  }

};
