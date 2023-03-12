const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getMentorHistory = (req, res) => {
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
      return res.status(500).json(err);
    } else {
      const q =
        'SELECT H.*, CT.duration AS duration, CT.topic AS topic, CT.start AS start, CT.end AS end, CT.date AS date, S.id AS s_id,  S.f_name AS s_fname, M.subject AS subject, S.l_name AS s_lname FROM `heroku_064c14c6215e460`.history AS H JOIN `heroku_064c14c6215e460`.students AS S ON H.student_id = S.id JOIN `heroku_064c14c6215e460`.create_timings AS CT ON H.create_timing_id = CT.id JOIN `heroku_064c14c6215e460`.mentors AS M ON H.mentor_id = M.id WHERE H.mentor_id = ?;';

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

module.exports = { getMentorHistory };
