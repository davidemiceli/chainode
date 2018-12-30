'use strict';


// Requirements
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const uuid4 = require('uuid/v4');
const configs = require('../../configs/configs');
const db = require('../../../models/redis/db');


module.exports = async (req, res) => {
  try {
    // Get user and password
    const id = req.params.id;
    const username = req.body.user;
    const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    // Get user
    const user = await db.Users.Get(id);
    // Check if user and password are correct
    if (username !== user.user || password !== user.password) {
      return res.ErrorHandler.Unauthorized('Wrong authentication parameters');
    }
    // Create JWT Token
    const to_encode = {
      user: username,
      password: password,
      uuid4: uuid4(),
      randomkey: Math.random(),
      now: moment().utc().valueOf()
    };
    // Generate access token
    const token = jwt.sign(to_encode, configs.jwt.secret, {
      algorithm: 'HS256',
      expiresIn: configs.jwt.expire
    });
    return res.json({id, token});
  } catch(err) {
    console.log(err.stack);
    return res.ErrorHandler.InternalServerError();
  }
};
