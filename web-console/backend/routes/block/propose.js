'use strict';

// Propose data to append to the ledger
module.exports = async (req, res) => {
  try {
    const data = req.body.data;
    if (!data) throw Error('Invalid block data.');
    await req.sdk.sendNewBlock(data);
    return res.json(true);
  } catch(err) {
    return res.ErrorHandler.InternalServerError(err.message);
  }
}
