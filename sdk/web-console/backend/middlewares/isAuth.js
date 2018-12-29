'use strict';


// Requirements
const jwt = require('jsonwebtoken');
const configs = require('../../../configs/configs');
const db = require('../../../../models/redis/db');


module.exports = async (req, res) => {
  try {
    // Get parameters
    const id = req.params.id;
    const token = (req.headers && req.headers['x-access-token']) || null;
    // Get user
    const peer = await db.Users.Get(id);
    // Try to decode token
    const decoded = jwt.verify(token, configs.jwt.secret, {
      algorithms: ['HS256'],
      maxAge: configs.jwt.expire
    });
    // Check if decoding is correct
    if (!decoded) {
      return res.ErrorHandler.Unauthorized('Invalid authorization');
    }
    // Check if data inside token is valid
    if (peer.user === decoded.user && peer.password === decoded.password) {
      return next();
    }
    return res.ErrorHandler.Unauthorized('Wrong authorization');
  } catch(err) {
    console.log(err.stack);
    return res.ErrorHandler.InternalServerError();
  }
};
