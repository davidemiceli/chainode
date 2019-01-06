'use strict';
/*
  Ledger model
*/


// Model to interact to the Ledger
module.exports = class {

  constructor(db, consistency) {
    this.db = db;
    this.consistency = consistency;
  }

  // Get the last blocks
  async GetBlocks(condition, howmuch) {
    howmuch = parseInt(howmuch || 25);
    const params = [];
    let where = '';
    if (condition) {
      const filters = [];
      if (condition.hash) {
        filters.push('hash=?');
        params.push(condition.hash);
      }
      if (condition.generatedTime) {
        filters.push('generatedTime>?');
        params.push(Number(condition.generatedTime));
      }
      if (filters.length) {
        where = `WHERE ${filters.join(' AND ')}`;
      }
    }
    const query = `SELECT * FROM ledger ${where} LIMIT ${howmuch}`;
    const res = await this.db.execute(query, params, {
      prepare: true,
      consistency: this.consistency
    });
    return res.rows;
  }

  // Add a new block
  AddBlock(newblock) {
    const query = `
    INSERT INTO ledger (hash, event_id, organization, generated_time, data)
    VALUES (:hash, :event_id, :organization, :generated_time, :data)`;
    return this.db.execute(query, newblock, {
      prepare: true,
      consistency: this.consistency
    });
  }

}
