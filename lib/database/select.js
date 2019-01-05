'use strict';


// Select database
module.exports = (configs, logger) => {
  const dbType = configs.type;
  const dbConfs = configs[dbType];
  switch(dbType) {
    case 'mongodb':
      return require('../../models/mongodb/db')(dbConfs, logger);
    case 'cassandra':
      return require('../../models/cassandra/db')(dbConfs, logger);
    default:
      throw Error('Invalid database or configurations.');
  }
}