const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const updateProfileMentorAbout = (req, res) => {
  const bio = req.body.bio;
  const sex = req.body.sex;
  const age = req.body.age;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const address = req.body.address;
  const yrs_exp = req.body.yrs_exp;
  const current_job = req.body.current_job;

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      // console.log(userInfo.id);
      const q =
        'UPDATE `ementor_db_1`.mentor_about SET `bio` = ?, `sex` = ?, `age` = ?, `phone_number` = ?, `email` = ?, address = ?,`yrs_exp` = ?,`current_job` = ? WHERE `mentor_id` = ?;';

      db.query(
        q,
        [
          bio,
          sex,
          age,
          phone_number,
          email,
          address,
          yrs_exp,
          current_job,
          userInfo.id
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          else {
            res.status(200).json(data);
            console.log(data);
          }
        }
      );
    }
  });
};

const updateProfileMentorExperience = (req, res) => {
  const current_job = req.body.current_job;
  const current_job_started = req.body.current_job_started;
  const company = req.body.company;

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      // console.log(userInfo.id);
      const q =
        'UPDATE  `ementor_db_1`.mentor_education SET current_job = ? , current_job_started = ?, company = ? WHERE mentor_id = ?';

      db.query(
        q,
        [current_job, current_job_started, company, userInfo.id],
        (err, data) => {
          if (err) return res.status(500).json(err);
          else {
            res.status(200).json(data);
            // console.log(data);
          }
        }
      );
    }
  });
};

const updateProfileMentorEducation = (req, res) => {
  const college = req.body.college;
  const college_yr_graduate = req.body.college_yr_graduate;
  const high_school = req.body.high_school;
  const hs_yr_graduated = req.body.hs_yr_graduated;

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      console.log(userInfo.id);
      const q =
        'UPDATE `ementor_db_1`.mentor_education SET `college` = ?, `college_yr_graduate` = ?, `high_school` = ?, `hs_yr_graduated` = ?  WHERE `mentor_id` = ?;';

      db.query(
        q,
        [
          college,
          college_yr_graduate,
          high_school,
          hs_yr_graduated,
          userInfo.id
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          else {
            res.status(200).json(data);
            // console.log(data);
          }
        }
      );
    }
  });
};

const updateProfileMentorSocial = (req, res) => {
  const fb_link = req.body.fb_link;
  const linked_in_link = req.body.linked_in_link;

  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      console.log(userInfo.id);
      const q =
        'UPDATE `ementor_db_1`.mentors SET fb_link = ?, linked_in_link = ? WHERE id = ?;';

      db.query(q, [fb_link, linked_in_link, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

module.exports = {
  updateProfileMentorAbout,
  updateProfileMentorExperience,
  updateProfileMentorEducation,
  updateProfileMentorSocial
};
