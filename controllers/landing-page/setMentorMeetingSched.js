const { db } = require('../../connection/connect');

const setMentorMeetingSched = (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const date = req.body.date;
  const status = 'Sent';
  const date_sent = req.body.date_sent;

  const q =
    'SELECT COUNT(*) AS total_sent FROM `ementor_db_1`.`meeting_request`;';

  db.query(q, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data[0].total_sent + 1);
      const total_sent = data[0].total_sent + 1;

      const q =
        'SELECT * FROM `ementor_db_1`.`meeting_request` WHERE email = ?';
      db.query(q, [req.body.email], (err, data) => {
        if (err) res.status(409).json(err);
        else if (data.length >= 1) {
          res
            .status(409)
            .json(
              'A request with this email is already sent. Please wait for our team to manage this'
            );
        } else {
          const q =
            'INSERT INTO `ementor_db_1`.`meeting_request` (`id`, `date`, `name`, `email`, `status`, `date_sent`) VALUES (?,?,?,?,?,?);';

          db.query(
            q,
            [
              `MAVEN-MTRQ-600${total_sent}`,
              date,
              name,
              email,
              status,
              date_sent
            ],
            (err, data) => {
              if (err) res.status(409).json(err);
              else {
                res.status(200).json(data);
              }
            }
          );
        }
      });
    }
  });
};

module.exports = { setMentorMeetingSched };
