'use strict';

// Requirements
const { toBlock } = require('../../../../lib/block');


// List blocks
module.exports = async (req, res) => {
  try {
    // Get conditions
    const condition = req.body;
    // Get last blocks
    const blocks = await req.db.Ledger.GetBlocks(condition, 25);
    // Parse blocks
    const results = blocks
      .map(toBlock)
      .map(b => {
        b.data = JSON.parse(b.data);
        return b;
      });
    // Return results
    return res.json(results);
  } catch(err) {
    req.sdk.logger.error(err.stack);
    return res.ErrorHandler.InternalServerError(err.message);
  }
}
