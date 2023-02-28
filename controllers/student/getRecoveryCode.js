const { db } = require('../../connection/connect');

const getRecoveryCode = (req, res) => {
  const q =
    'SELECT * FROM `heroku_064c14c6215e460`.`students` WHERE `email` = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    else if (data.length === 0) return res.status(404).json('Email not found!');
    else {
      const q =
        'SELECT * FROM `heroku_064c14c6215e460`.`students` WHERE `recovery_code` = ?';
      db.query(q, [req.body.recovery_code], (err, data) => {
        if (err) return res.status(500).json(err);
        else if (data.length === 0)
          return res.status(404).json('Wrong recovery code found!');
        else {
          // res.redirect('/student-reset-password');
          res.status(200).json('Go to update');
        }
      });
    }
  });
};

module.exports = { getRecoveryCode };
