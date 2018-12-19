'use strict';

// Requirements
const JaegerService = require('moleculer-jaeger');

// Export monitoring for Jaeger
module.exports = {
  mixins: [JaegerService],
  settings: {
    host: '172.25.255.40',
    port: 6832
  }
};