'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Peers collection
module.exports = new Schema({
  id: {type: String, unique: true, required: true, dropDups: true},
  blockgenerator: {type: Boolean, required: false},
  url: {type: String, unique: true, required: true, dropDups: true},
  public: {type: String, required: true},
  pending: {type: Boolean, required: false, default: true}
});
