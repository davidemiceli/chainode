'use strict';
/*
  Helpers functions
*/
const moment = require('moment');


// Get UTC timestamp
const utcTimestamp = () => moment().utc().valueOf();

// Get UTC timestamp
const utcISOstring = () => moment().utc().toISOString();


module.exports = {
  utcTimestamp,
  utcISOstring
};