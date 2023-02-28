const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getOwnTimings = (req, res) => {
  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) {
      res.status(500).json(err);
      console.log(userInfo);
    } else {
      const q =
        'SELECT * FROM `heroku_713c4886f766b8c`.create_timings WHERE mentor_id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(userInfo.id);
        }
      });
    }
  });
};
module.exports = { getOwnTimings };
