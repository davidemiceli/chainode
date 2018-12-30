'use strict';

const moment = require('moment');

// Format logs
module.exports = role => (level, args, bindings) => {
  const lev = level.toUpperCase();
  const datetime = moment().utc().toISOString();
  const items = args.map(i => typeof(i) === 'object' ? JSON.stringify(i) : i).join(' ');
  return [datetime, lev, bindings.ns, role, bindings.nodeID, bindings.mod, items].join('|');
}
