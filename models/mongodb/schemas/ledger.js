'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Blockchain ledger collection
module.exports = new Schema({
  hash: {type: String, unique: true, required: true, dropDups: true},
  eventId: {type: String, required: true},
  company: {type: String, required: true},
  proposedTime: {type: Number, required: true},
  generatedTime: {type: Number, required: true},
  data: {type: String, required: true}
})
.index({hash: 1}, {unique: true});
