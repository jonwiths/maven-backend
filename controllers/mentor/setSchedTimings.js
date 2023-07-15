const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const generateVerificationCode = () => {
  const chars = '0123456789MAVEN';
  const passwordLength = 4;
  let recoveryCode = '';

  for (let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    recoveryCode += chars.substring(randomNumber, randomNumber + 1);
  }
  return recoveryCode;
};

const setSchedTimings = (req, res) => {
  const duration = req.body.duration;
  const start = req.body.start;
  const end = req.body.end;
  const topic = req.body.topic;
  const date = req.body.date;
  const meeting_link = req.body.meeting_link;
  const status = 'Posted';

  if (duration === 'none') {
    res.json(`Please fill up duration`);
  } else {
    const q =
      'SELECT COUNT(*) AS total_sched_timings FROM `ementor_db_1`.create_timings;';

    const token =
      req.body.mentor ||
      req.query.mentor ||
      req.headers['x-access-token'] ||
      req.headers['Authorization'] ||
      req.headers['authorization'] ||
      req.cookies.mentor;

    if (!token) return res.status(401).json('Not logged in');
    else {
      db.query(q, (err, data) => {
        if (err) {
          res.json(err);
          // console.log(err);
        } else {
          // console.log('TOTAL SCHED TIMINGS: ' + data[0].total_sched_timings);
          const total_sched_timings = data[0].total_sched_timings + 1;

          jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
            if (err) return res.status(403).json('Token is not valid');
            else {
              const q =
                "SELECT * FROM `ementor_db_1`.create_timings WHERE start = ? AND date = ? AND (status = 'Posted' OR status = 'Booked') AND mentor_id = ?;";
              db.query(q, [start, date, userInfo.id], (err, data) => {
                console.log(data);
                if (data.length) {
                  res.status(403).send('Time AND date is already scheduled!');
                } else {
                  const q =
                    'SELECT * FROM `ementor_db_1`.create_timings WHERE  mentor_id = ?  AND date = ?';
                  db.query(q, [userInfo.id, date], (err, data) => {
                    if (err) return res.status(409).send(err);
                    else if (data.length >= 2) {
                      res
                        .status(409)
                        .send("You've reached 2 maximum schedule on that day.");
                    } else {
                      const q =
                        'SELECT * FROM `ementor_db_1`.create_timings WHERE date = ? AND start <= ? AND end >= ? AND mentor_id = ?;';

                      db.query(
                        q,
                        [date, start, end, userInfo.id],
                        (err, data) => {
                          if (err) return res.status(409).send(err);
                          else if (data.length > 0) {
                            res
                              .status(409)
                              .send(
                                'Invalid schedule time overlapping. Please check in your summary.'
                              );
                          } else {
                            const randomNum = generateVerificationCode();
                            const q =
                              'INSERT INTO `ementor_db_1`.`create_timings` (`id`, `duration`, `start`, `end`, `topic`, `date`, `meeting_link`, `status`, `mentor_id`) VALUES (?,?,?,?,?,?,?,?,?);';
                            db.query(
                              q,
                              [
                                `MENT-SCHED-200${total_sched_timings}` +
                                  randomNum,
                                duration,
                                start,
                                end,
                                topic,
                                date,
                                meeting_link,
                                status,
                                userInfo.id
                              ],
                              (err, data) => {
                                if (err) {
                                  console.log(err);
                                  return res.status(409).send(err);
                                } else {
                                  res
                                    .status(200)
                                    .json('Schedule has been added.');
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
};

module.exports = { setSchedTimings };
