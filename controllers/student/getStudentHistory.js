const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getStudentHistory = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      const q =
        'SELECT H.*, CT.duration AS duration, CT.start AS start, CT.end AS end, CT.date AS date, M.id AS m_id,  M.f_name AS m_fname, M.subject AS subject, M.l_name AS m_lname FROM `heroku_064c14c6215e460`.history AS H JOIN `heroku_064c14c6215e460`.students AS S ON H.student_id = S.id JOIN `heroku_064c14c6215e460`.create_timings AS CT ON H.create_timing_id = CT.id JOIN `heroku_064c14c6215e460`.mentors AS M ON H.mentor_id = M.id WHERE H.student_id = ?;';

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

module.exports = { getStudentHistory };
