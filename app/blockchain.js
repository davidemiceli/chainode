'use strict';

// Requirements
const uuidv4 = require('uuid/v4');
const bluebird = require('bluebird');
const CRYPT = require('./lib/crypt');
const services = require('./services/services');
const redis_client = require('./models/redis');
const InMemory = require('./models/inmemory/db');
const LedgerModel = require('./models/mongodb/methods/ledger');
const Routes = require('./routes');

// Blockchain
class Blockchain {

  constructor() { }

  calculate_hash(prev_hash, next_index, timestamp, data) {
    const to_hash = `${prev_hash}-${next_index}-${timestamp}-${data}`;
    return CRYPT.md5(to_hash);
  }

  to_block(blockdata) {
    return this.block(blockdata.prev_hash, blockdata.hash, blockdata.index, blockdata.timestamp, blockdata.data);
  }

  block(prev_hash, hash, index, timestamp, data) {
    return {
      index: index,
      timestamp: timestamp,
      hash: hash.toString(),
      prev_hash: prev_hash.toString(),
      data: data
    };
  }

  generate_next_block(prev_block_data, blockdata) {
    const prev_block = prev_block_data || {hash: uuidv4(), index: 0};
    const prev_hash = prev_block.hash;
    const next_index = prev_block.index + 1;
    const next_timestamp = Date.now();
    const next_hash = this.calculate_hash(prev_hash, next_index, next_timestamp, blockdata);
    return this.block(prev_hash, next_hash, next_index, next_timestamp, blockdata);
  }

  calculate_hash_from_block(block) {
    return this.calculate_hash(block.prev_hash, block.index, block.timestamp, block.data);
  }

  is_valid_block(one_block, prev_block) {
    if (prev_block.hash !== one_block.prev_hash) {
      console.log(`Invalid previous hash for block ${one_block.hash}.`);
      return false;
    }
    const one_block_hash = this.calculate_hash_from_block(one_block);
    if (one_block_hash !== one_block.hash) {
      console.log(`Invalid hash ${one_block.hash} compared to ${one_block_hash}.`);
      return false;
    }
    return true;
  }

  // [Block Generator] Generate blocks
  async generate_blocks(timing) {
    try {
      const blockdata = InMemory.PopQueque();
      timing = blockdata ? 0 : 5*1000;
      if (blockdata) {
        // Generate block
        const prev_block = await LedgerModel.GetLatestBlock();
        const prev_block_data = prev_block && prev_block[0];
        const newblock = this.generate_next_block(prev_block_data, blockdata);
        console.log(`The master peer is building a block for the transaction ${newblock.hash}.`);
        // Store block
        await LedgerModel.AddBlock(newblock);
      }
    } catch(e) {
      console.log('Error during block generation process.');
    } finally {
      await bluebird.delay(timing);
      return this.generate_blocks(timing);
    }
  }

  // [Peer Listener] Synchronize blocks
  async sync_blocks(timing) {
    try {
      // Check if the peer was created
      const peer = await redis_client.getAsync("peer");
      const blockgenerator = await redis_client.getAsync("blockgenerator");
      if (peer && !peer.blockgenerator && blockgenerator) {
        const peer_url = (JSON.parse(peer)).url;
        // Sync the peer blocks
        const sync_resp = await services.CallToOne('GET', peer_url, Routes.BLOCKS.SYNC);
        const synchronized_blocks = sync_resp.blocks || 0;
        timing = synchronized_blocks < 25 ? 1 : 60*1000;
      } else {
        timing = 100*1000;
      }
    } catch(e) {
      console.log('Error during ledger synchronization.');
      timing = 120*1000;
    } finally {
      // Wait and repeat sync action
      await bluebird.delay(timing);
      this.sync_blocks(timing);
    }
  }

};

module.exports = new Blockchain();
