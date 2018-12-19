'use strict';

// Requirements
const mongoose = require('mongoose');
const db = require('../db');

// Model for counters
class CounterModel {

  constructor() { }

  // Get auto-increment value
  async nextIndex(indexId){
    const id = mongoose.Types.ObjectId(indexId);
    const counter = await db.counter.findOneAndUpdate({_id: id}, {$inc: {num: 1}}, {upsert: true, new: true});
    return counter.num;
  }

}

module.exports = new CounterModel;
