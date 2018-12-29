'use strict';

// Propose data to append to the ledger
module.exports = async (req, res) => {
  try {
    const data = req.body.data;
    if (!data) throw Error('Invalid block data.');
    const serialized = JSON.stringify(data);
    await req.sdk.propose(serialized);
    return res.json(true);
  } catch(err) {
    return res.ErrorHandler.InternalServerError(err.message);
  }
}
