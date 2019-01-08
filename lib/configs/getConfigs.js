'use strict';
/*
  Get and parse configurations from a json file
*/

// Requirements
const fs = require('fs');


module.exports = () => {
  try {
    const configs = fs.readFileSync(process.env.CONFIGS);
    return JSON.parse(configs);
  } catch(err) {
    console.error('Missing environmental parameter "CONFIGS" (path and name of configuration file).');
    console.error(err.stack);
    process.exit(1);
  }
}
