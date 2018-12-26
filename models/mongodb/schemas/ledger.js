'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Blockchain ledger collection
module.exports = new Schema({
  index: {type: Number, unique: true, required: true, dropDups: true},
  hash: {type: String, unique: true, required: true, dropDups: true},
  timestamp: {type: Number, required: true},
  data: {type: String, required: true}
})
.index({hash: 1}, {unique: true})
.index({index: 1}, {unique: true});
