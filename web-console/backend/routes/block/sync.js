'use strict';


// Synchronize blocks
module.exports = async (req, res) => {
  try {
    // Start block synchronization
    await req.sdk.synchronizeBlocksAsync();
    return res.json(true);
  } catch(err) {
    return res.ErrorHandler.InternalServerError(err.message);
  }
}
