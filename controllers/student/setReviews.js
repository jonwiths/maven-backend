const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setReviews = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  const comment = req.body.comment;
  const mentor_id = req.body.mentor_id;
  const history_id = req.body.history_id;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    // console.log(userInfo.id);
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      const q = 'SELECT COUNT(*) AS total_reviews FROM `ementor_db_1`.reviews;';

      db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          // console.log(data[0].total_reviews + 1);
          const total_reviews = data[0].total_reviews + 1;

          const q =
            'SELECT * FROM `ementor_db_1`.reviews WHERE mentor_id = ? AND student_id = ? AND history_id = ?;';

          db.query(q, [mentor_id, userInfo.id, history_id], (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else if (data.length) {
              console.log(data.length);
              res
                .status(500)
                .json(
                  'You already give a comment to this mentor IN this meeting.'
                );
            } else {
              // console.log(data.length);
              const q =
                'INSERT INTO `ementor_db_1`.reviews(id, student_id, mentor_id, history_id, comment) VALUES (?,?,?,?,?);';

              db.query(
                q,
                [
                  `REVWS-STD-800${total_reviews}`,
                  userInfo.id,
                  mentor_id,
                  history_id,
                  comment
                ],
                (err, data) => {
                  if (err) {
                    // console.log('data', data);
                    console.log('err', err);
                    return res.status(500).json(err);
                  } else {
                    res.status(200).json(data);
                  }
                }
              );

              // console.log(data);
            }
          });
        }
      });
    }
  });
};

module.exports = { setReviews };
