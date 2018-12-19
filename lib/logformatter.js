'use strict';

// Format logs
module.exports = (level, args, bindings) => {
  const lev = level.toUpperCase();
  const datetime = new Date().toISOString();
  const items = args.map(i => typeof(i) === 'object' ? JSON.stringify(i) : i).join(' ');
  return [datetime, lev, bindings.ns, bindings.nodeID, bindings.mod, items].join('|');
}
