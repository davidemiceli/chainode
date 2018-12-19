'use strict';

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Counter schema
module.exports = new Schema({
  num: {type: Number, required: true, default: 0}
});
