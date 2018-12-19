'use strict';


// Handle errors on events
module.exports = (broker, err, eventName) => {
  broker.logger.error(`${eventName}:`, err && err.message);
  throw err;
}
