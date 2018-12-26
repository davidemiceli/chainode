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
  async prevHash(index) {
    const block = await this.db.ledger.find({index: index}).exec();
    return (block && block[0] && block[0].hash) || undefined;
  }

  // Get the last block
  GetLatestBlock(sorting) {
    sorting = sorting || {index: -1};
    return this.db.ledger.find().sort(sorting).limit(1).exec();
  }

  // Get the last blocks
  GetBlocks(condition, howmuch) {
    howmuch = howmuch || 25;
    const find = {};
    if (condition) {
      if (condition.hash) find.hash = condition.hash;
      if (condition.index) find.index = {$gt: condition.index};
      if (condition.timestamp) find.timestamp = {$gt: Number(condition.timestamp)};
      if (condition.data_md5) find.data_md5 = condition.data_md5;
    }
    return this.db.ledger.find(find).limit(howmuch).exec();
  }

  // Add a new block
  AddBlock(newblock) {
    return new this.db.ledger(newblock).save();
  }

}
