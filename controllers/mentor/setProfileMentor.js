const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setProfileMentorProfile = (req, res) => {};

const setProfileMentorAbout = (req, res) => {
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
      const q =
        'INSERT INTO `ementor_db_1`.mentor_about (bio, sex, age, phone_number, email, address, yrs_exp, current_job, mentor_id) VALUES(?,?,?,?,?,?,?,?,?)';

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

const setProfileMentorEducation = (req, res) => {
  const college = req.body.college;
  const college_yr_graduate = req.body.college_yr_graduate;
  const high_school = req.body.high_school;
  const hs_yr_graduated = req.body.hs_yr_graduated;
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
      const q =
        'INSERT INTO `ementor_db_1`.mentor_education(college, college_yr_graduate, high_school, hs_yr_graduated,current_job, current_job_started, company,mentor_id) VALUES(?,?,?,?,?,?,?,?)';

      db.query(
        q,
        [
          college,
          college_yr_graduate,
          high_school,
          hs_yr_graduated,
          current_job,
          current_job_started,
          company,
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

// const setProfileMentorExperience = (req, res) => {
//   const current_job = req.body.current_job;
//   const current_job_started = req.body.current_job_started;
//   const company = req.body.company;

//   const token =
//     req.body.mentor ||
//     req.query.mentor ||
//     req.headers['x-access-token'] ||
//     req.headers['Authorization'] ||
//     req.headers['authorization'] ||
//     req.cookies.mentor;

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
//     if (err) return res.status(500).json(err);
//     else {
//       // console.log(userInfo.id);
//       const q =
//         'INSERT INTO `ementor_db_1`.mentor_education(current_job, current_job_started, company, mentor_id) VALUES(?,?,?,?)';

//       db.query(
//         q,
//         [current_job, current_job_started, company, userInfo.id],
//         (err, data) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json(err);
//           } else {
//             res.status(200).json(data);
//             // console.log(data);
//           }
//         }
//       );
//     }
//   });
// };

module.exports = {
  setProfileMentorProfile,
  setProfileMentorAbout,
  setProfileMentorEducation
};
