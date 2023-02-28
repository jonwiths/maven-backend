const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setSchedTimings = (req, res) => {
  const duration = req.body.duration;
  const start = req.body.start;
  const end = req.body.end;
  const topic = req.body.topic;
  const date = req.body.date;
  const meeting_link = req.body.meeting_link;
  const status = 'Posted';
  const day = req.body.day;

  if (duration === 'none') {
    res.json(`Please fill up duration`);
  } else {
    const q =
      'SELECT COUNT(*) AS total_sched_timings FROM `heroku_713c4886f766b8c`.create_timings;';

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
                "SELECT * FROM `heroku_713c4886f766b8c`.create_timings WHERE start = ? AND date = ? AND status = 'Posted' AND mentor_id = ?;";
              db.query(q, [start, date, userInfo.id], (err, data) => {
                console.log(data);
                if (data.length) {
                  res.status(403).send('Time AND date is already scheduled!');
                } else {
                  const q =
                    'INSERT INTO `ementor_db_1`.`create_timings` (`id`, `duration`, `start`, `end`, `topic`, `date`, `meeting_link`, `day`, `status`, `mentor_id`) VALUES (?,?,?,?,?,?,?,?,?,?);';
                  db.query(
                    q,
                    [
                      `MENT-SCHED-200${total_sched_timings}`,
                      duration,
                      start,
                      end,
                      topic,
                      date,
                      meeting_link,
                      day,
                      status,
                      userInfo.id
                    ],
                    (err, data) => {
                      if (err) {
                        console.log(err);
                        return res.status(409).send(err);
                      } else {
                        res.status(200).json('Schedule has been added.');
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
  }
};

module.exports = { setSchedTimings };
