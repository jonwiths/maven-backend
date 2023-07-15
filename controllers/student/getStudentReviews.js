const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getStudentReviews = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  // const history_id = req.body.history_id;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      const q =
        'SELECT R.* FROM ementor_db_1.reviews AS R JOIN ementor_db_1.history AS H ON R.history_id = H.id WHERE R.student_id = ? ; ';

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

module.exports = { getStudentReviews };
