'use strict';

// Requirements
const axios = require('axios');


// APIs client
module.exports = async (method, baseurl, endpoint, data) => {
  try {
    if (!/^(GET|POST)$/.test(method)) {
      throw Error('Invalid REST APIs method.');
    }
    endpoint = endpoint && endpoint.replace(/^\//, '');
    const apiMethod = method.toLowerCase();
    const fullApiUrl = `${baseurl}/${endpoint}`;
    const r = await axios[apiMethod](fullApiUrl, data);
    return r.data;
  } catch(e) {
    console.log(e.stack);
    throw e;
  }
}
