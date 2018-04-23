'use strict';

// Requirements
const Utils = require('../../lib/utils');
const services = require('../../services/services');
const Routes = require('../../routes');

module.exports = function(req, res, next) {
  const blockgenerator = req.blockgenerator;
  // Item to propose
  const itemdata = req.body.data;
  if (!itemdata) {
    return res.ErrorHandler.InternalServerError('Missing data.');
  }
  const data = (typeof(itemdata) === 'string') ? itemdata : JSON.stringify(itemdata);
  const proposed = {
    signature: req.peer_signature,
    peer_id: req.current_peer.id,
    data: data
  }
  // Propose block to the blockgenerator
  console.log(`Proposing a new transaction...`);
  return services.CallToOne('POST', blockgenerator.url, Routes.TRANSACTION.RECEIVE, proposed)
  .then(function(resp) {
    console.log(`Transaction accepted from Block Generator.`);
    const obj = resp.data;
    return res.json(obj);
  })
  .catch(function(err) {
    console.log(err)
    return res.ErrorHandler.InternalServerError('Rejected transaction from Block Generator.');
  });
}
