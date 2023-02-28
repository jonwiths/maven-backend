const { db } = require('../../connection/connect');

const getSchedTimings = (req, res) => {
  const q =
    "SELECT ct.*, fm.f_name AS f_name, fm.l_name AS l_name, fm.price, fm.profile, fm.subject, fm.fb_link FROM `heroku_713c4886f766b8c`.create_timings AS ct JOIN `heroku_713c4886f766b8c`.mentors AS fm ON (ct.mentor_id = fm.id) WHERE ct.status = 'Posted' ORDER BY ct.date;";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    else {
      res.status(200).json(data);
      // console.log(data);
    }
  });
};

module.exports = { getSchedTimings };
