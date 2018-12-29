'use strict';

const moment = require('moment');

// Format logs
module.exports = (level, args, bindings) => {
  const lev = level.toUpperCase();
  const datetime = moment().utc().toISOString();
  const items = args.map(i => typeof(i) === 'object' ? JSON.stringify(i) : i).join(' ');
  return [datetime, lev, bindings.ns, bindings.nodeID, bindings.mod, items].join('|');
}
