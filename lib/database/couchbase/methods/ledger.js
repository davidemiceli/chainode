'use strict';
/*
  Ledger model
*/


// Model to interact to the Ledger
module.exports = class {

  constructor(bucketname, db, q) {
    this.bucketname = bucketname;
    this.db = db;
    this.q = q;
    this.dbUtils = require('../helpers')(db, q);
  }

  // Get the last blocks
  async GetBlocks(condition, howmuch, offset) {
    howmuch = parseInt(howmuch || 25);
    offset = parseInt(offset || 0);
    let where = '';
    if (condition) {
      const filters = [];
      if (condition.id) {
        filters.push('id > $id');
      }
      if (condition.generatedTime) {
        filters.push('generatedTime > $generatedTime');
        condition.generatedTime = Number(condition.generatedTime);
      }
      if (filters.length) {
        where = `WHERE ${filters.join(' AND ')}`;
      }
    }
    const query = `SELECT * FROM ${this.bucketname} ${where} LIMIT ${howmuch} OFFSET ${offset}`;
    const rows = await this.dbUtils.query(query, condition);
    return rows && rows.map(r => r[this.bucketname]);
  }

  // Add a new block
  async AddBlock(newblock) {
    const id = this.dbUtils.metaIdFromHash('ledger', newblock.id);
    return await this.dbUtils.insert(id, newblock);
  }

}
