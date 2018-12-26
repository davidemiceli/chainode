'use strict';


// Check if an action is into a series of services
const hasAction = (action, services) => {
  for (const service of services) {
    const res = Object.keys(service.actions).filter(a => a === action).length;
    if (res) return true;
  }
  return false;
}

// Call all brokers
module.exports = async function(action, params, opts = {}) {
  const nodes = await this.call('$node.list', {
    onlyAvailable: true,
    withServices: true
  });

  // Make direct call to the given Node ID
  const calls = nodes
    .filter(node => hasAction(action, node.services))
    .map(node => node.id)
    .map(nodeID => {
      return {
        action: action,
        params: params,
        options: Object.assign({nodeID}, opts)
      };
    });
  return this.mcall(calls);
}
