'use strict';
/*
  Consumer topics by peer role
*/


// Return topic by role
module.exports = (role, topics) => {
  switch(role) {
    case 'peer':
      return [topics.pending];
    default:
      throw Error('Invalid peer role to select kafka topic.');
  }
};
