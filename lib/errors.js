'use strict';


// Handle errors
module.exports = async (broker, err) => {
  if (broker) {
    broker.logger.error('Error on processing stream data.');
    broker.logger.error(err.stack);
    await broker.stop();
  } else {
    console.error(err.stack);
  }
  throw err;
}
