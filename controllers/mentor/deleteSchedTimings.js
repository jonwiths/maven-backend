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
      'SELECT * FROM `ementor_db_1`.create_timings WHERE `id` = ? AND mentor_id = ?;';
    db.query(q, [sched_id, userInfo.id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Token is not valid');
      } else if (!data.length) {
        return res.status(500).json("SCHEDULE ID doesn't found");
      } else {
        console.log(token);
        const q =
          'DELETE FROM `ementor_db_1`.create_timings WHERE id = ? AND mentor_id = ?; ';

        db.query(
          q,
          [sched_id, userInfo.id],
          (err, data) => {
            console.log(data);

            if (err) return res.status(500).err;
            else {
              if (err) {
                return res.status(500).json(err);
              } else {
                res.status(200).json('Schedule has been deleted.');
              }
            } //
          } //
        ); //
      }
    });
  });
};

module.exports = { deleteSchedTimings };
