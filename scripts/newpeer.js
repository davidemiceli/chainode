'use strict';

/*
  To create a new peer of the blockchain
*/

// Requirements
const argv = require('minimist')(process.argv.slice(2));
const Blockchain = require('../sdk/blockchain');

// Set url
const url = argv.url;
const blockchain_id = argv.chain;
if (!url) {
  console.log('Error: missing url (ie: --url=http://publicaddress.com)');
  process.exit();
}
if (!blockchain_id) {
  console.log('Error: chain (ie: --chain=a23605ef8253...)');
  process.exit();
}

// Instantiate the blockchain
const blockchain = new Blockchain();

// Add a new peer
blockchain.addpeer(blockchain_id, url);
