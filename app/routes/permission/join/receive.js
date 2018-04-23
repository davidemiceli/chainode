'use strict';

// Requirements
const Utils = require('../../../lib/utils');
const CRYPT = require('../../../lib/crypt');
const services = require('../../../services/services');
const redis_client = require('../../../models/redis');
const PeersModel = require('../../../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  // Get the info about the peer asking to join
  const peer_url = (req.body && req.body.url) || null;
  console.log(`A new peer with url ${peer_url} asked to join.`);
  try {
    // Check if url and peer data sended are correct
    const resp = await services.CallToOne('GET', peer_url, 'peer');
    const peerdata = resp.data;
    console.log(`New peer ${peerdata.id} informations retrieved.`);
    // Delete old peer existing infos
    const removed = await PeersModel.RemovePeer({url: peerdata.url});
    // Update peer info to db as pending peer
    const added = await PeersModel.AddToPendingPeers(peerdata);
    // Return back the blockgenerator infos
    const current_peer = req.current_peer;
    delete current_peer.private;
    return res.json(current_peer);
  } catch(e) {
    console.log(e);
    return res.ErrorHandler.InternalServerError();
  }
}
