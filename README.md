# Chainode

An experimental private blockchain network based on node.js.

It allows to exchange data (as transactions) between participants using encrypted messages with the signature of each participant. These transactions are stored as blocks in a distributed ledger.

This is a work in progress.

## How it works

#### Participants
Every participant is a network's node that is defined by an ID and a public key.  

There are two types of peer node:
- A block generator.
- Many block listeners.

##### Block generator (generator node)
There is only one block generator in every single blockchain network.

The block generator's tasks are:
- Generate a block of transactions every defined interval.
- Accept and validate the transactions from other nodes.
- Distribute the blocks to other nodes.

##### Block listeners
The block listeners' tasks are:
- Validate each block it receives from the block generator.
- Send new transactions to the block generator.
- Keep a local copy of the shared blocks' ledger.

#### Network
The access to the blockchain network is restricted. Every participant must keep inside the folder `/data/{blockchain_id}/peers` the json files (`{peer_id}.json`) with urls and public keys of all other participants.

## Install

```
npm install chainode
```

## Getting started

##### Create a new blockchain
To create a new blockchain, on the project folder, type:
```
npm run create -- --url=http://localhost:60000
```
The `url` parameter should be the external url of the network.
This will create a new blockchain and the new block generator peer data that you will see inside `/data` folder.
Inside `/data/{blockchain_id}/peers` put all the files of the other participants.

To start the blockchain network as the block generator type:
```
npm run start -- --port=60000 --chain=20881c896... --peer=c4bed8fa7...
```
where the parameter `chain` is the blockchain id and `peer` is the block generator id.
Then you will see:
```
   ____ _           _                 _      
  / ___| |__   __ _(_)_ __   ___   __| | ___
 | |   | '_ \ / _` | | '_ \ / _ \ / _` |/ _ \
 | |___| | | | (_| | | | | | (_) | (_| |  __/
  \____|_| |_|\__,_|_|_| |_|\___/ \__,_|\___|

Peer c4bed8fa781b0a2504ee994276d92afe is connecting to the blockchain 20881c89687aee3009d8176a27f7fbf7.
Peer c4bed8fa781b0a2504ee994276d92afe listening on port 60000
```

##### Join to an existing blockchain
If you want to join in an existing blockchain as a block listener, you must create a new peer typing:
```
npm run newpeer -- --chain=20881c896... --url=http://localhost:60001
```
This will create the blockchain and the peer data inside the `/data` folder.
Inside `/data/{blockchain_id}/peers` put all the files of the other participants.

To connect to the blockchain type:
```
npm run start -- --port=60001 --chain=20881c89687aee3009d8176a27f7fbf7 --peer=3acdfafb56fc26a119c45107fe06753a
```
where the parameter `chain` is the blockchain id and `peer` is the peer id.

## Getting started with node.js SDK
To handle the blockchain, there is the javascript SDK.

Follow the examples:
```javascript
'use strict';

// Requirements
const Blockchain = require('../sdk/blockchain');

// Instantiate the blockchain
const blockchain = new Blockchain();

// Create a new Blockchain
const blockchain_info = blockchain.create('http://localhost:8333');

// Get IDs
const blockchain_id = blockchain_info.blockchain_id;
const blockgenerator_id = blockchain_info.blockgenerator_id;

// Start the blockchain as the block generator
const blockgenerator = blockchain.start(blockchain_id, blockgenerator_id, 8333);

// Add a new peer to an existing blockchain
const peer_id = blockchain.addpeer(blockchain_id, 'http://localhost:8334');

// Start the blockchain as a peer
const peer = blockchain.start(blockchain_id, peer_id, 8334);

// Add a new block
peer.propose("Hello! This is my first block");

// List the ledger
console.log(peer.blockchain.ledger);
```

## License

Chainode is licensed under the terms of the [GNU Affero General Public License Version 3 (AGPL)](LICENSE).
