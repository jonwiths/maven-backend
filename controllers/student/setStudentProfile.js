const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const setStudentAboutProfile = (req, res) => {
  const token =
    req.body.user ||
    req.query.user ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.user;

  const bio = 'Not Set';
  const sex = 'Not Set';
  const phone_number_ns = 'Not Set';
  const age = 'Not Set';
  const address = 'Not Set';

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    // console.log(userInfo.id);
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      // console.log(data.length);
      const q =
        'INSERT INTO `heroku_713c4886f766b8c`.student_about(bio, sex, phone_number, age, address) VALUES (?,?,?,?,?);';

      db.query(
        q,
        [bio, sex, phone_number_ns, age, address, userInfo.id],
        (err, data) => {
          if (err) {
            // console.log('data', data);
            console.log('err', err);
            return res.status(500).json(err);
          } else {
            res.status(200).json(data);
          }
        }
      );

      // console.log(data);
    }
  });
};

module.exports = { setStudentAboutProfile };
