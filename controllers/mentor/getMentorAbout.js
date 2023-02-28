const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getMentorAbout = (req, res) => {
  const token =
    process.env.MY_MENTOR_TOKEN ||
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
        'SELECT * FROM `heroku_064c14c6215e460`.mentor_about WHERE mentor_id = ?;';

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
module.exports = { getMentorAbout };
