'use strict';
/*
  Counter model
*/

// Requirements
const mongoose = require('mongoose');


// Model for counters
module.exports = class {

  constructor(db) {
    this.db = db;
  }

  // Get auto-increment value
  async nextIndex(indexId) {
    const id = mongoose.Types.ObjectId(indexId);
    const counter = await this.db.counter.findOneAndUpdate({_id: id}, {$inc: {num: 1}}, {upsert: true, new: true});
    return counter.num;
  }

}
