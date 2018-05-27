'use strict';

// Requirements
const Utils = require('../../../lib/utils');
const services = require('../../../services/services');
const redis_client = require('../../../models/redis');
const Routes = require('../../../routes');

module.exports = async function(req, res, next) {
  try {
    // Get the info about the peer to create
    const blockgenerator_url = (req.body && req.body.blockgenerator_url) || null;
    if (!blockgenerator_url) {
      return res.ErrorHandler.InternalServerError('Missing blockgenerator_url parameter.');
    }
    const peerdata = {
      url: req.current_peer.url
    };
    console.log(`Asking to join to ${blockgenerator_url}.`);
    // Ask to the blockgenerator to join in the blockchain network
    const resp = await services.CallToOne('POST', blockgenerator_url, Routes.PERMISSION.JOIN.RECEIVE, peerdata);
    // Parse blockgenerator data to be stored
    const blockgenerator_data = resp.data;
    console.log(`Block Generator ${blockgenerator_data.id} informations retrieved.`);
    const blockgenerator_data_json = JSON.stringify(blockgenerator_data);
    // Store blockgenerator infos
    const obj = await redis_client.setAsync("blockgenerator", blockgenerator_data_json)
    return res.json(true);
  } catch(e) {
    console.log(e);
    return res.ErrorHandler.InternalServerError('Invalid response from Block Generator.');
  }
}
