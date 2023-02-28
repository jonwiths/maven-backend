const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const updateStudentAboutProfile = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  const bio = req.body.bio;
  const sex = req.body.sex;
  const phone_number = req.body.phone_number;
  const age = req.body.age;
  const address = req.body.address;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    // console.log(userInfo.id);
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      // console.log(data.length);
      const q =
        'UPDATE `heroku_713c4886f766b8c`.student_about SET bio = ?, sex = ?, phone_number = ?, age =?, address = ? WHERE student_id = ?;';

      db.query(
        q,
        [bio, sex, phone_number, age, address, userInfo.id],
        (err, data) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json(data);
          }
        }
      );

      // console.log(data);
    }
  });
};

const updateStudentEducationProfile = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  const college = req.body.college;
  const college_yr = req.body.college_yr;
  const high_school = req.body.high_school;
  const hs_yr = req.body.hs_yr;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    // console.log(userInfo.id);
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      // console.log(data.length);
      const q =
        'UPDATE `heroku_713c4886f766b8c`.student_education SET college = ?, college_yr = ?, high_school = ?, hs_yr =?  WHERE student_id = ?;';

      db.query(
        q,
        [college, college_yr, high_school, hs_yr, userInfo.id],
        (err, data) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json(data);
          }
        }
      );

      // console.log(data);
    }
  });
};

module.exports = { updateStudentEducationProfile, updateStudentAboutProfile };
