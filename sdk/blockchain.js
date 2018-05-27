'use strict';

// Requirements
const axios = require('axios');
const APIs = require('./apis');
const Routes = require('../app/routes');

// Blockchain SDK
module.exports = class SDK {

  constructor(data) {
    this.peer_url = data.url;
    this.blockgenerator = data.blockgenerator;
    this.api_key = data.api_key;
    this.api_secret = data.api_secret;
  }

  // Authenticate client and get access token
  async auth() {
    try {
      const authresp = await this.api(Routes.AUTH.SIGNIN, {
        key: this.api_key,
        secret: this.api_secret
      });
      const token = (authresp && authresp.token) || null;
      if (!token) throw Error('Error on client authentication.');
      this.token = token;
      return true;
    } catch(err) {
      throw Error(err.message);
    }
  }

  // Send request to the peer server
  apicall(endpoint, token, data) {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (token) headers.headers['X-ACCESS-TOKEN'] = token;
    const peer_url = this.peer_url;
    const apimethod = APIs[endpoint];
    if (!apimethod) return new Error('Endpoint not supported.');
    // Clean endpoint
    if (endpoint) endpoint = endpoint.replace(/^\//, '');
    // Return api request
    if (apimethod === 'GET') {
      return axios.get(`${peer_url}/${endpoint}`, headers);
    }
    return axios.post(`${peer_url}/${endpoint}`, data, headers);
  }

  // Make API call
  async api(endpoint, data) {
    try {
      data = data || {};
      const token = this.token || null;
      const resp = await this.apicall(endpoint, token, data);
      return resp.data;
    } catch(err) {
      throw Error(err.message);
    }
  }

};
