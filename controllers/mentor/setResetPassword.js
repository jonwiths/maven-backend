const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { db } = require('../../connection/connect');

const setResetPassword = (req, res) => {
  const { token, password } = req.body;

  const q =
    'SELECT * FROM `heroku_064c14c6215e460`.mentors WHERE reset_password_token = ? AND reset_password_expires > NOW()';

  db.query(q, [token], (err, data) => {
    if (err) return res.status(409).send(err);
    else if (!data.length) {
      return res.status(404).json({ message: 'Invalid token' });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const q =
        'UPDATE `heroku_064c14c6215e460`.mentors SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE reset_password_token = ?';

      db.query(q, [hashedPassword, token], (err, data) => {
        if (err) return res.status(409).send(err);
        else {
          res.status(200).json({ message: 'Password reset successful' });
        }
      });
    }
  });
};

module.exports = { setResetPassword };
