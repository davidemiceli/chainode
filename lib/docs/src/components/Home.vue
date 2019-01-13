<template>
  <div class="p-t-80 container">

    <div class="row">

      <div class="col-md-6 text-right">
        <img src="/img/image.png" style="width: 400px;"/>
      </div>

      <div class="col-md-6">
        <h1 class="top-title">Chainode</h1>
        <h1 class="title">
          Private<br />Blockchain<br />Network
        </h1>
      </div>

    </div>

    <p class="sentences m-t-40">
      Chainode is a private blockchain designed to be fast, lightweight, and highly scalable. The network allows to exchange data (i.e. transactions) between trusted participants.
      These transactions are stored as blocks in a distributed ledger.
    </p>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">Highly scalable</p>
        <p>
          Each peer can be deployed, executed, and scaled up and down asynchronously and independently from the others peers.
          Peers can be runned as containers on different clusters handled by different container orchestrators (like Kubernetes, Mesos, etc).
        </p>
      </div>

      <div class="col-md-6">
        <p class="small-title">Load balancing</p>
        <p>
          Designed to support high data volumes, the blocks and the ledger are load balanced: 
          the blocks are distributed between different peers that acts as a single one, sharing the same Kafka group id.
        </p>
      </div>

    </div>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">Resilient</p>
        <p>
          Each peer is resistant to failures. If a peer service (or the node where it is running) falls,
          it can be immediately restarted on another node without (thanks to Kafka retention features) losing data and starting from where he had stopped.
        </p>
      </div>

      <div class="col-md-6">
        <p class="small-title">Fast</p>
        <p>
          Every block is propagated to the network and added to the ledger as soon as it was generated (if it was considered valid by the peers),
          so without any delay or emission at every defined time interval.
        </p>
      </div>

    </div>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">Lightweight</p>
        <p>
          A chainode instance (a simple peer) is very lightweight: can be runned on cheap machines (like a Raspberry Pi, so as many docker containers on a single machine).
        </p>
      </div>

      <div class="col-md-6">
        <p class="small-title">Message driven</p>
        <p>
          The network communication is Kafka based. The peers communicate with each other by exchanging messages asynchronously. Communication can be public or private.
        </p>
      </div>

    </div>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">REST APIs</p>
        <p>
          Every peer exposes web APIs to be handled more easily by other applications.
        </p>
      </div>

      <div class="col-md-6">
        <p class="small-title">Web Console</p>
        <p>
          Every peer exposes a Web Console UI for status monitoring, use, and general testing too.
        </p>
      </div>

    </div>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">Open Source</p>
        <p>
          Chainode is an Open Source project, written in pure Javascript for Node.js, and it is based on Kafka as communication system and block order.
          The documentation is Creative Commons Licensed.
        </p>
      </div>

    </div>

  </div>
</template>

<script>
// Routes
import { Routes } from '@/src/router/routes';

export default {
  name: Routes.HOME.name,
  data() {
    return {};
  }
}
</script>
