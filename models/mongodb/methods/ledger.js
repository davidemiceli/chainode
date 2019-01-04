'use strict';
/*
  Ledger model
*/


// Model to interact to the Ledger
module.exports = class {

  constructor(db) {
    this.db = db;
  }

  // Get the last block
  GetLatestBlock(sorting) {
    sorting = sorting || {timestamp: -1};
    return this.db.ledger.find().sort(sorting).limit(1).exec();
  }

  // Get the last blocks
  GetBlocks(condition, howmuch) {
    howmuch = howmuch || 25;
    const find = {};
    if (condition) {
      if (condition.hash) find.hash = condition.hash;
      if (condition.proposedTime) find.proposedTime = {$gt: Number(condition.proposedTime)};
    }
    return this.db.ledger.find(find).limit(howmuch).exec();
  }

  // Add a new block
  AddBlock(newblock) {
    return new this.db.ledger(newblock).save();
  }

}
