const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getCurrentStudent = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.header['user'] ||
    req.header['jwt'] ||
    req.cookies.user ||
    req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) {
      res.status(500).json(err);
      console.log(userInfo);
    } else {
      const q = 'SELECT * FROM `ementor_db_1`.students WHERE id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          const { password, ...others } = data[0];
          res.status(200).json(others);
          // console.log(userInfo.id);
        }
      });
    }
  });
};

module.exports = { getCurrentStudent };
