'use strict';

// Requirements
const LedgerModel = require('../../models/mongodb/methods/ledger');
const Blockchain = require('../../blockchain');

module.exports = function(req, res, next) {
  const condition = (req.method === "GET") ? req.query : req.body || {};
  return LedgerModel.GetBlocks(condition, 25)
  .then(function(blocks) {
    blocks = blocks.map(block => Blockchain.to_block(block));
    return res.json(blocks);
  })
  .catch(function(err) {
    return res.ErrorHandler.InternalServerError();
  });
}
