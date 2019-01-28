'use strict';
/*
  Helpers for couchbase client
*/


// Create a key
const metaIdFromHash = (recordType, blockId) => {
  return `${recordType}:${blockId}`;
}

// Get a record
const get = db => id => {
  return new Promise((resolve, reject) => {
    return db.get(id, function(err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  }); 
}

// Execute a query
const query = (db, q) => (qs, params) => {
  const query = q.fromString(qs);
  return new Promise((resolve, reject) => {
    return db.query(query, params, function(err, rows) {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

// Insert data
const insert = db => (id, data) => {
  return new Promise((resolve, reject) => {
    return db.insert(id, data, function(err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  }); 
}


module.exports = (db, q) => ({
  metaIdFromHash: metaIdFromHash,
  get: get(db),
  insert: insert(db),
  query: query(db, q)
});
