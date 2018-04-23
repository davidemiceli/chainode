'use strict';

// Requirements
const db = require('../db');

// Model to interact to the Ledger
class LedgerModel {

  constructor() { }

  // Get the last block
  GetLatestBlock() {
    return db.ledger.find().sort({index: -1}).limit(1).exec();
  }

  // Get the last blocks
  GetBlocks(condition, howmuch) {
    howmuch = howmuch || 25;
    const find = {};
    if (condition) {
      if (condition.hash) find.hash = condition.hash;
      if (condition.index) find.index = {$gt: Number(condition.index)};
      if (condition.timestamp) find.timestamp = {$gt: Number(condition.timestamp)};
    }
    return db.ledger.find(find).limit(howmuch).exec();
  }

  // Add a new block
  AddBlock(newblock) {
    return new db.ledger(newblock).save();
  }

}

module.exports = new LedgerModel;
