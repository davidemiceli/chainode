'use strict';

/*
  To start a blockchain
*/

// Requirements
const figlet = require('figlet');
const argv = require('minimist')(process.argv.slice(2));
const Blockchain = require('../sdk/blockchain');

const port = argv.port || 8333;
const peer_id = argv.peer;
const blockchain_id = argv.chain;

if (!peer_id) {
  console.log('Error: missing peer (ie: --peer=a23605ef8253...)');
  process.exit();
}
if (!blockchain_id) {
  console.log('Error: chain (ie: --chain=a23605ef8253...)');
  process.exit();
}

function main() {
  // Instantiate the blockchain
  const blockchain = new Blockchain();
  // Start the blockchain
  return blockchain.start(blockchain_id, peer_id, port);
}

return figlet('Chainode', function(err, data) {
  if (err) {
    console.dir(err);
    return;
  }
  console.log(data);
  return main();
});
