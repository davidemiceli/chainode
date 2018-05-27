'use strict';

// Requirements
const Utils = require('../../lib/utils');
const sign = require('../../lib/sign');
const services = require('../../services/services');
const Routes = require('../../routes');

module.exports = function(req, res, next) {
  // Item to propose
  const blockgenerator = req.blockgenerator;
  const proposed = req.encrypted_data;
  if (!proposed) {
    return res.ErrorHandler.InternalServerError('Missing encrypted data.');
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
    console.log(err);
    return res.ErrorHandler.InternalServerError('Rejected transaction from Block Generator.');
  });
}
