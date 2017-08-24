'use strict';

/*
  To create a new blockchain
*/

// Requirements
const argv = require('minimist')(process.argv.slice(2));
const Blockchain = require('../sdk/blockchain');

// Set url
const url = argv.url;
if (!url) {
  console.log('Error: missing url (ie: --url=http://publicaddress.com)');
  process.exit();
}

// Instantiate the blockchain
const blockchain = new Blockchain();

// Create a new Blockchain
const blockchain_info = blockchain.create(url);
