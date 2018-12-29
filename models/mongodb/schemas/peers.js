'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Peers collection
module.exports = new Schema({
  id: {type: String, unique: true, required: true, dropDups: true},
  user: {type: String, required: true},
  password: {type: String, required: true},
  verified: {type: Boolean, required: false, default: false}
});
