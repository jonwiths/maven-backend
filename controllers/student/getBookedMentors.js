const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getBookedMentors = (req, res) => {
  // const token = req.cookies.user
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

  const q =
    'SELECT BS.*, S.id,M.profile AS profile, M.access AS access,  M.f_name AS f_name, M.l_name AS l_name, M.subject AS subject, CT.id AS create_id, CT.meeting_link AS meeting_link, CT.date AS date, CT.duration AS duration, CT.start AS start, CT.end AS end,  CT.status AS status FROM `heroku_064c14c6215e460`.booking_status AS BS JOIN `heroku_064c14c6215e460`.mentors AS M ON BS.mentor_id = M.id JOIN `heroku_064c14c6215e460`.students AS S ON BS.student_id = S.id JOIN `heroku_064c14c6215e460`.create_timings AS CT ON BS.create_timing_id = CT.id WHERE S.id = ? AND CT.status = "Booked" ORDER BY  CT.status desc, CT.date ASC, STR_TO_DATE(CT.start, "%H:%i") ASC';

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
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

module.exports = { getBookedMentors };
