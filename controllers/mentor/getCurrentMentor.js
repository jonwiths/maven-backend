const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');
const getCurrentMentor = (req, res) => {
  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.header['mentor'] ||
    req.header['jwt'] ||
    req.cookies.mentor ||
    req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) {
      res.status(500).json(err);
      const { jwt } = req.cookies;
      console.log('JWT ', jwt);

      console.log(userInfo.id);
    } else {
      const q = 'SELECT * FROM `heroku_713c4886f766b8c`.mentors WHERE id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          const { password, ...others } = data[0];
          res.status(200).json(others);
          console.log(userInfo.id);
        }
      });
    }
  });
};
module.exports = { getCurrentMentor };
