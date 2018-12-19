'use strict';


// Handle errors on services
module.exports = (ctx, err) => {
  // ctx.broker.logger.error(ctx.action.name, err && err.message);
  throw err;
}
