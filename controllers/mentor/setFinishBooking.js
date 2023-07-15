const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setFinishBooking = (req, res) => {
  const date = new Date();
  const options = { timeZone: 'Asia/Manila' };
  const philippinesTime = date.toLocaleString('en-US', options);

  const student_id = req.body.student_id;
  const schedule_id = req.body.schedule_id;
  const status = 'Finished';

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  const q = 'SELECT COUNT(*) AS total_history FROM `ementor_db_1`.history;';

  if (!token) return res.status(401).json('Not logged in');
  else {
    db.query(q, (err, data) => {
      if (err) {
        res.json(err);
        // console.log(err);
      } else {
        // console.log('TOTAL SCHED TIMINGS: ' + data[0].total_history);
        const total_history = data[0].total_history + 1;

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
          if (err) return res.status(403).json('Token is not valid');
          else {
            const q =
              'INSERT INTO `ementor_db_1`.`history` (`id`, `mentor_id`, `student_id`, `create_timing_id`, `status`, `date_ended`) VALUES (?,?,?,?,?,?);';
            db.query(
              q,
              [
                `MAVEN-HIST-900${total_history}`,
                userInfo.id,
                student_id,
                schedule_id,
                status,
                philippinesTime
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(409).send(err);
                } else {
                  const q =
                    "UPDATE `ementor_db_1`.create_timings SET status ='Finished' WHERE mentor_id = ? AND id = ?";

                  db.query(q, [userInfo.id, schedule_id], (err, data) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json(err);
                    } else {
                      res.status(200).json('Meeting has been finished.');
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  }
};

module.exports = { setFinishBooking };
