'use strict';


// Select database
module.exports = (configs, broker) => {
  const dbType = configs.type;
  switch(dbType) {
    case 'mongodb':
      return require('../../models/mongodb/db')(configs, broker)
    case 'cassandra':
      return {};
    default:
      throw Error('Invalid database or configurations.');
  }
}
