const { db } = require('../../connection/connect');

const getTotalMentors = (req, res) => {
  const q = 'SELECT COUNT(*) AS total_mentors FROM `ementor_db_1`.`mentors`;';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    else {
      res.status(200).json(data);
    }
  });
};

const getTotalStudents = (req, res) => {
  const q = 'SELECT COUNT(*) AS total_students FROM `ementor_db_1`.`students`;';

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    else {
      res.status(200).json(data);
    }
  });
};

module.exports = { getTotalMentors, getTotalStudents };
