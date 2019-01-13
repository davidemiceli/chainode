'use strict';

// Requirements
const { toBlock } = require('../../../../lib/block');


// List blocks
module.exports = async (req, res) => {
  try {
    // Get conditions
    const condition = req.body;
    const pag = parseInt(req.body.pag || 0);
    const limit = 25;
    const offset = (pag < 0) ? pag : pag * limit;
    // Get last blocks
    const blocks = await req.db.Ledger.GetBlocks(condition, limit, offset);
    // Parse blocks
    const results = blocks
      .map(toBlock);
    // Return results
    return res.json(results);
  } catch(err) {
    req.sdk.logger.error(err.stack);
    return res.ErrorHandler.InternalServerError(err.message);
  }
}
