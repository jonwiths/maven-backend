const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getProfileMentorProfile = (req, res) => {
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
        'SELECT id, profile, f_name, l_name, access, fb_link, linked_in_link, price FROM `heroku_713c4886f766b8c`.mentors WHERE id = ?';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

const getProfileMentorAbout = (req, res) => {
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
        'SELECT A.*, M.fb_link AS fb_link, M.linked_in_link AS linked_in_link FROM `heroku_713c4886f766b8c`.mentor_about AS A JOIN `heroku_713c4886f766b8c`.mentors AS M ON A.mentor_id = M.id WHERE mentor_id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

const getProfileMentorEducation = (req, res) => {
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
        'SELECT * FROM  `heroku_713c4886f766b8c`.mentor_education WHERE mentor_id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
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
  getProfileMentorProfile,
  getProfileMentorAbout,
  getProfileMentorEducation
};
