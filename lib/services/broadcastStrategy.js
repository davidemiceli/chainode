'use strict';

// Requirements
const { random } = require("lodash");
const BaseStrategy = require("moleculer").Strategies.Base;

// Check if node is a member
const onlyMembers = node => node;

// Broadcast strategy
class BroadcastStrategy extends BaseStrategy {
  select(list) {
    // Filter by the authenticated nodes
    return list.filter(onlyMembers);
    // return list[random(0, list.length - 1)];
  }
}

module.exports = BroadcastStrategy;
