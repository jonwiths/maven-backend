const { db } = require('../../connection/connect');

const getAllMentors = (req, res) => {
  const q = 'SELECT * FROM `heroku_713c4886f766b8c`.mentors ORDER BY f_name;';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    else {
      res.status(200).json(data);
      // console.log(data);
    }
  });
};

module.exports = { getAllMentors };
