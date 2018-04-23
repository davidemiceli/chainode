'use strict';

// Requirements
const configs = require('../../configs/configs');

// Model in memory data
class InMemory {

  constructor() {
    this.queque = [];
  }

  GetQueque() {
    return this.queque;
  }

  AddToQueque(data) {
    this.queque.push(data);
    return true;
  }

  PopQueque() {
    return this.queque.shift();
  }

};

// In memory initialization
const InMemoryDB = new InMemory();

module.exports = InMemoryDB;
