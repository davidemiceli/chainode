'use strict';
/*
  Users model
*/
// Requirements
const moment = require('moment');


// Model for users managements
module.exports = class {

  constructor(db) {
    this.db = db;
  }

  async Get(id) {
    const res = await this.db.getAsync(`user:${id}`);
    return JSON.parse(res);
  }

  async Add(id, data, verified = false) {
    data.verified = Boolean(verified);
    const timestamp = moment().utc().valueOf();
    data.created_at = data.created_at || timestamp;
    data.updated_at = timestamp;
    const userData = JSON.stringify(data);
    await this.db.set(`user:${id}`, userData);
    return data;
  }

  Remove(condition) {
    return;
  }

  async MarkAsVerified(id) {
    const user = await this.Get(id);
    return await this.Add(id, user, true);
  }

}
