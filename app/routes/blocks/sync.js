'use strict';

// Requirements
const Blockchain = require('../../blockchain');
const LedgerModel = require('../../models/mongodb/methods/ledger');
const services = require('../../services/services');
const Routes = require('../../routes');

module.exports = async function(req, res, next) {
  try {
    const blockgenerator = req.blockgenerator;
    const latest_block = await LedgerModel.GetLatestBlock();
    const latestblock = (latest_block && latest_block[0]) || undefined;
    const last_block_index = (latestblock && latestblock.index) || undefined;
    const condition = {index: last_block_index};
    const resp = await services.CallToOne('POST', blockgenerator.url, Routes.BLOCKS.LATEST, condition);
    const blocks = resp.data;
    for (let i=0; i<blocks.length; i++) {
      // Get the block and its previous
      const prev_block = (i > 0) ? blocks[i-1] : latestblock;
      const newblock = blocks[i];
      // Check if the block is valid
      const is_valid = (i === 0 && !prev_block && newblock.index === 1) ? true : Blockchain.is_valid_block(newblock, prev_block);
      if (is_valid) {
        // Store on db if it is valid
        const added = await LedgerModel.AddBlock(newblock);
      } else {
        // Raise an error if not valid
        return res.ErrorHandler.InternalServerError(`Found invalid block with hash ${newblock.hash}.`);
      }
    }
    // Return the number of fetched blocks
    return res.json({blocks: blocks.length});
  } catch(e) {
    return res.ErrorHandler.InternalServerError();
  }
}
