'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Blockchain ledger collection
module.exports = new Schema({
  id: {type: String, unique: true, required: true, dropDups: true},
  hash: {type: String, unique: true, required: true, dropDups: true},
  proposedTime: {type: Number, required: true},
  generatedTime: {type: Number, required: true},
  data: {type: String, required: true}
})
.index({hash: 1}, {unique: true})
.index({id: 1}, {unique: true});
