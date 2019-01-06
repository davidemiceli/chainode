<p align="center">
  <a href="https://github.com/davidemiceli/chainode" target="_blank" rel="noopener noreferrer">
    <img src="img/logo.png" alt="Chainode logo">
  </a>
</p>
<h1 align="center">Chainode</h1>

<h4 align="center"><em>Fast, Highly scalable, and Lightweight Private Blockchain Network</em></h4>

<p align="center">
  <a href="https://github.com/davidemiceli/chainode/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="GitHub license">
  </a>
  <a href="https://github.com/davidemiceli/chainode/pulls" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
</p>

Chainode is a private blockchain that allows to exchange data (i.e. transactions) between trusted participants. These transactions are stored as blocks in a distributed ledger.

Chainode is written in pure Javascript for Node.js, and it is based on Kafka as communication system and block order. It is a work in progress.

Main features:
- _**Highly scalable**_
  - *Each peer can an be deployed, executed, and scaled up and down asynchronously and independently from the others peers. Peers can be runned as containers on different clusters handled by different container orchestrators (like Kubernetes, Mesos, etc).*
- _**Resilient**_
  - *Each peer is resistant to failures. If a peer service (or the node where it is running) falls, it can be immediately restarted on another node without (thanks to Kafka features) losing data and starting from where he had stopped.*
- _**Message driven**_
  - *The network communication is Kafka based. The peers communicate with each other by exchanging messages asynchronously. Communication can be public or private.*
- _**Fast**_
  - *Every block is propagated to the network and added to the ledger as soon as it was generated (if it was considered valid by the peers), so without any delay or emission at every defined time interval.*
- _**Lightweight**_
  - *A chainode instance (a simple peer) is very lightweight: can be runned on cheap machines (like a Raspberry Pi, so as many docker containers on a single machine).*
- _**REST APIs**_
  - *Every peer exposes web APIs to be handled more easily by other applications.*
- _**Web Console**_
  - *Every peer exposes a Web Console UI for status monitoring, use, and general testing too.*

## How it works

#### Participants
Every participant is a network's node that is defined by:
- Blockchain id (the identifier of the blockchain).
- Organization (a company, society, club, group, etc., or just an arbitrary identifier to cluster different peers).
- Role.

Currently, there are three types of peer node:
- Kafka peers.
- Chainode peers:
  - proposes new blocks.
  - receives, validates, and adds new blocks to the ledger.
- Storage peers.

##### Kafka peers
Kafka peers are mainly communication nodes. There can only be one Kafka cluster for every single blockchain network.

A Kafka peer tasks are:
- Enable communications between chainode peers.
- Keep order of emitted blocks.

##### Chainode peers
Chainode peers are simple chainode instances.

A chainode peer tasks are:
- propose new transactions (generate and send new blocks to the Kafka peers).
- validate each block it receives from the Kafka peers.
- communicate with storage peers:
  - to add new validated blocks to the ledger.
  - to retrieve ledger's blocks.

##### Storage peers
The storage peers are distributed database clusters (like Cassandra, MongoDB, etc) that holds the ledger.

A storage peer tasks are:
- Keep a local copy of the shared blocks' ledger.

#### Network
The access to the blockchain network is restricted. To join, every peer needs to be approved:
- Every participant must send a join request to the block generator.
- The block generator can approve or decline a peer to join.

## Requirements
Chainode is based on:
- Apache Kafka v2.1+ (or Confluent Kafka v4.1.2+)
- Node.js v10.1+
- One of the following databases:
  - Cassandra v3+
  - MongoDB v3.6+

## Architecture

To write...

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
Create the Kafka topics (if not exist):
```bash
/confluent/bin/kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 3 --topic blockchain.blocks.pending --if-not-exists
/confluent/bin/kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 3 --topic blockchain.blocks.ledger --if-not-exists
```
To start a peer use a configuration file:
```bash
CONFIGS=/app/test/configs/blockgenerator.js npm start
```
The configurations can be overwritten like the following examples:
```bash
CONFIGS=/app/test/configs/generic.js BLOCKCHAIN=blockchain ROLE=peer PEER_ID=000 DB_TYPE=mongodb DB_HOST=172.25.255.20 WEBUI_PORT=8080 npm start
CONFIGS=/app/test/configs/generic.js BLOCKCHAIN=blockchain ROLE=peer PEER_ID=001 DB_TYPE=mongodb DB_HOST=172.25.255.21 WEBUI_PORT=8081 npm start
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

#### Start dockerized environment for testing

At first, is required to start a dockerized environment for testing.
To do this, run:
```bash
cd chainode/
DB=cassandra npm run start-dev-env
npm run create-dev-topics
npm run test-integration
```
if needed (based on used database), run:
```bash
bin/create-db/<database-name>
```
for example:
```bash
bin/create-db/cassandra
```

#### Run unit tests
After dockerized environment is started, run unit tests:
```bash
docker exec -it nodejs npm test
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
