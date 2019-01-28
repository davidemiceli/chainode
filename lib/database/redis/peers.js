'use strict';
/*
  Peers model
*/
// Requirements
const moment = require('moment');


// Model for peers managements
module.exports = class {

  constructor(db) {
    this.db = db;
  }

  async Get(id) {
    const res = await this.db.getAsync(`peer:${id}`);
    return JSON.parse(res);
  }

  GetPending() {
    return;
  }

  async Add(id, data, verified = false) {
    data.verified = Boolean(verified);
    const timestamp = moment().utc().valueOf();
    data.created_at = data.created_at || timestamp;
    data.updated_at = timestamp;
    const peerData = JSON.stringify(data);
    await this.db.set(`peer:${id}`, peerData);
    return data;
  }

  Remove(condition) {
    return;
  }

  GetAll() {
    return;
  }

  async MarkAsVerified(id) {
    const peer = await this.Get(id);
    return await this.Add(id, peer, true);
  }

}
