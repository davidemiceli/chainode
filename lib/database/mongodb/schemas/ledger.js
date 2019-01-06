'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Blockchain ledger collection
module.exports = new Schema({
  hash: {type: String, unique: true, required: true, dropDups: true},
  event_id: {type: String, required: true},
  organization: {type: String, required: true},
  generated_time: {type: Number, required: true},
  data: {type: String, required: true}
})
.index({hash: 1}, {unique: true});
