'use strict';


// Handle errors
module.exports = async (logger, err) => {
  if (logger) {
    logger.error(err.stack);
  } else {
    console.error(err.stack);
  }
  throw err;
}
