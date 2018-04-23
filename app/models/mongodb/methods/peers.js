'use strict';

// Requirements
const db = require('../db');

// Model for peers managements
class PeersModel {

  constructor() { }

  GetPeer(condition) {
    if (condition.id) {
      return db.peers.find({id: condition.id}).limit(1).exec();
    }
    return new Promise();
  }

  GetPendingPeers() {
    return db.peers.find({pending: true}).exec();
  }

  AddToPendingPeers(data) {
    data.pending = true;
    return new db.peers(data).save();
  }

  GetFromPendingPeers(condition) {
    if (condition.id) {
      return db.peers.find({id: condition.id, pending: true}).exec();
    } else if (condition.url) {
      return db.peers.find({url: condition.url, pending: true}).exec();
    }
    return new Promise();
  }

  RemovePeer(condition) {
    return db.peers.remove(condition).exec();
  }

  GetPeers() {
    return db.peers.find({pending: false}).exec();
  }

  AddToPeers(condition) {
    return db.peers.findOneAndUpdate(condition, {$set: {pending: false}}, {
      upsert: false,
      new: true
    }).exec();
  }

}

module.exports = new PeersModel;
