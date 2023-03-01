const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setBookMentor = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  const mentor_id = req.body.mentor_id;
  const meeting_id = req.body.meeting_id;
  const status = 'Booked';

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    // console.log(userInfo.id);
    if (err) return res.status(500).json(err);
    else {
      const q =
        'SELECT COUNT(*) AS total_booking FROM  `heroku_064c14c6215e460`.`booking_status`;';

      db.query(q, (err, data) => {
        if (err) {
          // console.log(err);
          return res.status(500).json(err);
        } else {
          // console.log(data[0].total_booking + 1);
          const total_booking = data[0].total_booking + 1;

          const q =
            'SELECT *  FROM `heroku_064c14c6215e460`.`create_timings` WHERE mentor_id = ? AND id = ?;';

          db.query(q, [mentor_id, meeting_id], (err, data) => {
            if (err) {
              // console.log(data.affectedRows);
              return res.status(500).json(err);
            } else if (!data.length) {
              console.log(data.length);
              res.status(500).json("Mentor ID or Meeting ID doesn't found!");
            } else {
              // console.log(data.length);
              const q =
                'INSERT INTO `heroku_064c14c6215e460`.booking_status(id, status, student_id, mentor_id, create_timing_id, date_booked) VALUES (?,?,?,?,?,?);';

              db.query(
                q,
                [
                  `BOOK-STS-700${total_booking}`,
                  status,
                  userInfo.id,
                  mentor_id,
                  meeting_id,
                  new Date().toLocaleDateString()
                ],
                (err, data) => {
                  if (err) {
                    // console.log(data);
                    return res.status(500).json(err);
                  } else {
                    const q =
                      "UPDATE `heroku_064c14c6215e460`.create_timings SET status = 'Booked' WHERE id = ? AND mentor_id = ?;";

                    db.query(q, [meeting_id, mentor_id], (err, data) => {
                      if (err) {
                        res
                          .status(500)
                          .json('Update create schedule Error !' + err);
                      } else {
                        res.status(200).json(data);
                        console.log(data);
                      }
                    });

                    // console.log(data);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};

module.exports = { setBookMentor };
