<p align="center">
  <a href="https://github.com/davidemiceli/chainode" target="_blank" rel="noopener noreferrer">
    <img src="img/logo.png" alt="Chainode logo">
  </a>
</p>
<h1 align="center">Chainode</h1>

<h4 align="center">A private blockchain network.</h4>

Chainode allows to exchange data (as transactions) between participants using encrypted messages with the signature of each participant. These transactions are stored as blocks in a distributed ledger.

Chainode is written in Javascript for Node.js, and it is a work in progress.

## How it works

#### Participants
Every participant is a network's node that is defined by an ID, an ip address, and a public key.  

There are two types of peer node:
- A block generator.
- Many block listeners.

The blockchain is defined by its block generator, so every block generator represents a different blockchain.

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
The access to the blockchain network is restricted. To join, every peer needs to be approved:
- Every participant must send a join request to the block generator.
- The block generator can approve or decline a peer to join.

## Requirements
Chainode is based on:
- Node.js v8.0+
- Redis (https://redis.io)
- One of the following databases:
  - MongoDB (https://www.mongodb.com)

# Getting started

#### Docker
Chainode can be runned using docker-compose
```bash
git clone -b develop https://github.com/davidemiceli/chainode.git
cd chainode/docker
docker-compose up -d
docker exec -it chainbox001 npm run blockgenerator
```
To shutdown the application:
```bash
cd chainode/docker
docker-compose down
```

#### Github
Download Chainode from github and start the server
```bash
git clone -b develop https://github.com/davidemiceli/chainode.git
cd chainode
```
Edit the configuration on `/app/configs/configs.js` and then run the server:
```bash
bin/start --port 80
```
Then you will see:
```bash
____ _           _                 _      
/ ___| |__   __ _(_)_ __   ___   __| | ___
| |   | '_ \ / _` | | '_ \ / _ \ / _` |/ _ \
| |___| | | | (_| | | | | | (_) | (_| |  __/
\____|_| |_|\__,_|_|_| |_|\___/ \__,_|\___|

Peer server listening on port 80
```

##### Start a peer
To start a peer use a configuration file:
```bash
CONFIGS=/app/test/configs/blockgenerator.js npm start
```
Or to overwrite configurations:
```bash
CONFIGS=/app/test/configs/blockgenerator.js BLOCKCHAIN=blockchain ROLE=blockgenerator PEER_ID=001 DB_HOST=172.25.255.21 WEBUI_PORT=8080 npm start
```

##### APIs
```bash
curl -X GET http://172.25.255.50:8080/api -H "Content-Type: application/json"
curl -X POST http://172.25.255.50:8080/api/block/list -H "Content-Type: application/json" -d '{"index": 0}'
curl -X POST http://172.25.255.50:8080/api/block/propose -H "Content-Type: application/json" -d '{"data": {"ok": true}}'
```

##### Peer management
At start, once the peer server started, you must create a new peer to join to an existing blockchain or create a new block generator that will handle a new blockchain.

Create a new blockchain and a block generator peer (the `url` parameter should be the external url of the peer):
```bash
curl -X POST http://172.18.0.2/peer/new -H "Content-Type: application/json" \
--data '{"type":"blockgenerator","url":"http://172.18.0.2"}'
```

From another server, create a new peer (the `url` parameter should be the external url of the peer):
```bash
curl -X POST http://172.18.0.3/peer/new -H "Content-Type: application/json" \
--data '{"type":"peer","url":"http://172.18.0.3"}'
```
##### Permissions
Subscribe the peer to the block generator (to join on the blockchain):
```bash
curl -X POST http://172.18.0.3/permission/join/ask -H "Content-Type: application/json" \
--data '{"blockgenerator_url":"http://172.18.0.2"}'
```

The block generator can see all the pending peers that made request to join:
```bash
curl -X GET http://172.18.0.2/peer/list/pending -H "Content-Type: application/json"
```

The block generator can approve a peer to join:
```bash
curl -X POST http://172.18.0.2/permission/join/approve -H "Content-Type: application/json" \
--data '{"url":"http://172.18.0.3"}'
```
where the parameter `url` is the url of the `peer` that needs to be approved.

The block generator can see all the approved peers of the blockchain network:
```bash
curl -X GET http://172.18.0.2/peer/list/joined -H "Content-Type: application/json"
```

The peer can see the block generator it has joined:
```bash
curl -X GET http://172.18.0.3/permission/joined -H "Content-Type: application/json"
```

##### Transactions
The block generator can see the latest blocks:
```bash
curl -X GET http://172.18.0.2/blocks/latest -H "Content-Type: application/json"
```

The peer can send a transaction (propose a new block) to the block generator:
```bash
curl -X POST http://172.18.0.3/transaction/propose -H "Content-Type: application/json" \
--data '{"data":{"something":"..."}}'
```
The transaction informations are on `data` parameter.

The block generator can check the latest blocks after the last one was added:
```bash
curl -X GET http://172.18.0.2/blocks/latest -H "Content-Type: application/json"
```

## Tests

### Integration tests

To run integration tests:
```bash
git clone -b develop https://github.com/davidemiceli/chainode.git
cd chainode/
bin/integration-test
```

## Install
```bash
npm install chainode
```

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
