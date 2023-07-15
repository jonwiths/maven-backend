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
        "SELECT * FROM `ementor_db_1`.create_timings WHERE mentor_id = ? ORDER BY CASE WHEN status = 'Posted' THEN 1 WHEN status = 'Booked' THEN 2 WHEN status = 'Finished' THEN 3 ELSE 4 END, date ASC, STR_TO_DATE(start, '%H:%i') ASC, end, status DESC;";

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
