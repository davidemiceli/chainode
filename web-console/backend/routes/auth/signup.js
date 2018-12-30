'use strict';

// Requirements
const crypto = require('crypto');
const Validator = require("fastest-validator");
const db = require('../../../models/redis/db');

// Validator
const v = new Validator();
const check = v.compile({
  id: {type: "string", min: 7, max: 255},
  user: {type: "string", min: 8, max: 255},
  password: {type: "string", min: 8, max: 255}
});

module.exports = async (req, res) => {
  try {
    // Get user parameters
    const id = req.params.id;
    // Check if the user already exists
    const u = await db.Users.Get(id);
    if (u) {
      return res.ErrorHandler.Unauthorized('The user already exists.');
    }
    // user data
    const user = {
      id: id,
      user: req.body.user,
      password: req.body.password
    };
    // Check if user data are correct
    const errors = check(user);
    if (errors.length) {
      const msg = errors[0].message;
      return res.ErrorHandler.InternalServerError(msg);
    }
    // Encrypt password
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    // Store user
    await db.Users.Add(id, user);
    return res.json({id});
  } catch(err) {
    console.log(err.stack);
    return res.ErrorHandler.InternalServerError();
  }
};
