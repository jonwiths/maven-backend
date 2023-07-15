const express = require('express');
const router = express.Router();
const { db } = require('../../connection/connect');

// Route to handle GET request for reset password token validation
const getResetPassword = (req, res) => {
  const { token } = req.params;

  const q =
    'SELECT * FROM `ementor_db_1`.students WHERE reset_password_token = ? AND reset_password_expires > NOW()';

  db.query(q, [token], (err, data) => {
    if (err) return res.status(409).json(err);
    else {
      res.send('Token validated successfully');
    }
  });
  // TODO: Implement token validation logic here
};

module.exports = { getResetPassword };
