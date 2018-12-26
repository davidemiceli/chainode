'use strict';
/*
  Peers model
*/

// Model for peers managements
module.exports = class {

  constructor(db) {
    this.db = db;
  }

  GetPeer(condition) {
    if (condition.id) {
      return this.db.peers.find({id: condition.id}).limit(1).exec();
    }
    return new Promise();
  }

  GetPendingPeers() {
    return this.db.peers.find({pending: true}).exec();
  }

  AddToPendingPeers(data) {
    data.pending = true;
    return new this.db.peers(data).save();
  }

  GetFromPendingPeers(condition) {
    if (condition.id) {
      return this.db.peers.find({id: condition.id, pending: true}).exec();
    } else if (condition.url) {
      return this.db.peers.find({url: condition.url, pending: true}).exec();
    }
    return new Promise();
  }

  RemovePeer(condition) {
    return this.db.peers.remove(condition).exec();
  }

  GetPeers() {
    return this.db.peers.find({pending: false}).exec();
  }

  AddToPeers(condition) {
    return this.db.peers.findOneAndUpdate(condition, {$set: {pending: false}}, {
      upsert: false,
      new: true
    }).exec();
  }

}
