<p align="center">
  <a href="https://github.com/davidemiceli/chainode" target="_blank" rel="noopener noreferrer">
    <img src="img/logo.png" alt="Chainode logo">
  </a>
</p>
<h1 align="center">Chainode</h1>

<h4 align="center"><em>Fast, Highly Scalable, and Lightweight Private Blockchain Network</em></h4>

<p align="center">
  <a href="https://github.com/davidemiceli/chainode/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="GitHub license">
  </a>
  <a href="https://github.com/davidemiceli/chainode/pulls" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
</p>

Chainode is a private blockchain designed to be fast, lightweight, and highly scalable. The network allows to exchange data (i.e. transactions) between trusted participants. These transactions are stored as blocks in a distributed ledger.

Chainode is written in pure Javascript for Node.js, and it is based on Kafka as communication system and block order. It is a work in progress.

## Features

The main features are:

- _**Highly scalable**_
  - *Each peer can be deployed, executed, and scaled up and down asynchronously and independently from the others peers. Peers can be runned as containers on different clusters handled by different container orchestrators (like Kubernetes, Mesos, etc).*
- _**Load balancing**_
  - *Designed to support high data volumes, the blocks and the ledger are load balanced: the blocks are distributed between different peers that acts as a single one, sharing the same Kafka group id.*
- _**Resilient**_
  - *Each peer is resistant to failures. If a peer service (or the node where it is running) falls, it can be immediately restarted on another node without (thanks to Kafka retention features) losing data and starting from where he had stopped.*
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

## Index of contents

- [**Introduction**](https://github.com/davidemiceli/chainode/wiki)
- [**Features**](https://github.com/davidemiceli/chainode/wiki/Features)
- [**How it works**](https://github.com/davidemiceli/chainode/wiki/HowItWorks)
- [**Requirements**](https://github.com/davidemiceli/chainode/wiki/Requirements)
- [**Architecture**](https://github.com/davidemiceli/chainode/wiki/Architecture) 
- [**Getting Started**](https://github.com/davidemiceli/chainode/wiki/GettingStarted) 
- [**Configurations**](https://github.com/davidemiceli/chainode/wiki/Configurations)
- [**Development**](https://github.com/davidemiceli/chainode/wiki/Development)
- [**SDK**](https://github.com/davidemiceli/chainode/wiki/SDK)
- [**REST APIs**](https://github.com/davidemiceli/chainode/wiki/RestApis)
  - [**Status**](https://github.com/davidemiceli/chainode/wiki/RestApis-Status)
  - [**Stats**](https://github.com/davidemiceli/chainode/wiki/RestApis-Stats)
  - [**List of blocks**](https://github.com/davidemiceli/chainode/wiki/RestApis-ListOfBlocks)
  - [**New transaction**](https://github.com/davidemiceli/chainode/wiki/RestApis-NewTransaction)

## License

Chainode is licensed under the terms of the [GNU Affero General Public License Version 3 (AGPL)](LICENSE).  
Documentation is licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).
