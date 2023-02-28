const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getMentorSummary = (req, res) => {
  const token =
    // process.env.MY_MENTOR_TOKEN ||
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      // console.log(userInfo.id);
      const q =
        'SELECT * FROM `heroku_713c4886f766b8c`.mentor_summary WHERE mentor_id = ?; ';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

module.exports = { getMentorSummary };
