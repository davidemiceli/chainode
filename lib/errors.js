'use strict';


// Handle errors
module.exports = (logger, err) => {
  if (logger) {
    logger.error(err.stack);
  } else {
    console.error(err.stack);
  }
  throw err;
}
