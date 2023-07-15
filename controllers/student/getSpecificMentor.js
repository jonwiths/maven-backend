const { db } = require('../../connection/connect');

const getSpecificMentor = (req, res) => {
  const id = req.query.id;

  const q =
    'SELECT M.id, M.f_name, M.l_name, M.price, M.fb_link, M.linked_in_link, A.bio, A.sex, A.phone_number, A.yrs_exp, A.address, A.age, A.current_job, E.college, E.college_yr_graduate, E.high_school, E.hs_yr_graduated, E.current_job, E.current_job, E.company FROM `ementor_db_1`.mentors AS M JOIN `ementor_db_1`.mentor_about AS A ON A.mentor_id = M.id JOIN `ementor_db_1`.mentor_education AS E ON E.mentor_id = M.id WHERE M.id = ?';

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
      console.log(id);
    }
  });
};

module.exports = { getSpecificMentor };
