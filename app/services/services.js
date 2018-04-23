'use strict';

// Requirements
const axios = require('axios');
const configs = require('../configs/configs');

// Services
class Services {

  constructor() { }

  // Send data to one peer
  CallToOne(method, peer_url, endpoint, data) {
    if (endpoint) endpoint = endpoint.replace(/^\//, '');
    if (method === 'GET') {
      return axios.get(`${peer_url}/${endpoint}`);
    }
    return axios.post(`${peer_url}/${endpoint}`, data);
  }

};

module.exports = new Services();
