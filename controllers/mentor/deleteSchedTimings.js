const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const deleteSchedTimings = (req, res) => {
  const sched_id = req.body.sched_id;

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    const q =
      'SELECT * FROM `heroku_713c4886f766b8c`.create_timings WHERE `id` = ? AND mentor_id = ?;';
    db.query(q, [sched_id, userInfo.id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Token is not valid');
      } else if (data.length === 0) {
        return res.status(500).json('Invalid SCHEDULE ID');
      } else {
        console.log(token);
        const q =
          'DELETE FROM `heroku_713c4886f766b8c`.create_timings WHERE id = ? AND mentor_id = ?; ';

        db.query(
          q,
          [sched_id, userInfo.id],
          (err, data) => {
            console.log(data);

            if (err) return res.status(500).err;
            else {
              const q =
                'SELECT meeting_available  FROM `heroku_713c4886f766b8c`.mentor_summary WHERE `mentor_id` = ?;';

              db.query(q, [userInfo.id], (err, data) => {
                if (err) {
                  return res.status(500).json(err);
                } else {
                  // console.log(data[0].total_mentors + 1);

                  const q =
                    'UPDATE `heroku_713c4886f766b8c`.mentor_summary SET meeting_available = meeting_available-1 WHERE mentor_id = ?;';

                  db.query(q, [userInfo.id], (err, data) => {
                    if (err) {
                      return res.status(500).json(err);
                    } else {
                      res.status(200).json('Schedule has been deleted.');
                    }
                  });
                }
              });
            } //
          } //
        ); //
      }
    });
  });
};

module.exports = { deleteSchedTimings };
