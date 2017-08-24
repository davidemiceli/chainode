'use strict';

// Requirements
const crypto = require('crypto');
const Block = require('./block');

module.exports = class {

  constructor() {
    this.ledger = [
      new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7")
    ];
  }

  // Blockchain Methods
  getLatestBlock() {
    return this.ledger[this.ledger.length - 1];
  }

  findBlockIndex(hash) {
    for (let i=0; i<this.ledger.length; i++) {
      if (this.ledger[i].hash === hash) return i+1;
    }
    return 'not found';
  }

  getLastBlocksFromHash(hash) {
    const blockIndex = this.findBlockIndex(hash);
    return (blockIndex === 'not found') ? [] : this.ledger.slice(blockIndex, blockIndex+50);
  }

  generateNextBlock(blockData) {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = blockData.time;
    // console.log(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
  }

  calculateHashForBlock(block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
  }

  calculateHash(index, previousHash, timestamp, data) {
    // return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    return crypto.createHash('sha256').update(index + previousHash + timestamp + data).digest('hex');
  }

  addBlock(newBlock) {
    const existsData = this.ledger.filter(function(ledg) {
      return (ledg.hash === newBlock.hash) ? true : false;
    })[0];
    if (existsData) {
      return false;
    } else {
      // console.log(`The block ${newBlock.hash} was stored by peer ${this.getId()}`);
      this.ledger.push(newBlock);
      return true;
    }
  }

  isValidNewBlock(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index');
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previoushash');
      return false;
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof this.calculateHashForBlock(newBlock));
      console.log('invalid hash: ' + this.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
      return false;
    }
    return true;
  }

  generatePendingData(blockData) {
    const newId = `${Date.now()}-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-${Math.random()}`.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    const newHash = crypto.createHash('md5').update(newId).digest("hex");
    return {
      hash: newHash,
      time: Date.now(),
      data: blockData
    };
  }

};
