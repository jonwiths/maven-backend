const { db } = require('../../connection/connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  // const chars =
  //   '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // const passwordLength = 6;
  // let recoveryCode = '';

  // for (let i = 0; i <= passwordLength; i++) {
  //   let randomNumber = Math.floor(Math.random() * chars.length);
  //   recoveryCode += chars.substring(randomNumber, randomNumber + 1);
  // }

  const f_name = req.body.s_fname;
  const l_name = req.body.s_lname;
  const email = req.body.s_email;
  const phone = req.body.s_phone;
  const password = req.body.s_password;
  const s_cpassword = req.body.s_cpassword;
  const status = 'Created';

  const currentDate = new Date().toLocaleString();

  const q =
    'SELECT * FROM `heroku_064c14c6215e460`.`students` WHERE `email` = ? OR `phone_number` = ?;';

  db.query(q, [email, phone], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(409).json('Email or Phone number already exists!');

    const q =
      'SELECT COUNT(*) AS total_student FROM `heroku_064c14c6215e460`.`students`;';

    db.query(q, (err, data) => {
      if (err) console.log(err);
      console.log(data[0].total_student + 1);
      const total_student = data[0].total_student + 1;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const insertQ =
        'INSERT INTO `heroku_064c14c6215e460`.`students`(`id`,`f_name`,`l_name`,`email`,`password`,`phone_number`,`date_created`,  `status`) VALUES(?,?,?,?,?,?,?,?)';

      db.query(
        insertQ,
        [
          `MAVEN-STUD-000${total_student}`,
          f_name,
          l_name,
          email,
          hashedPassword,
          phone,
          currentDate,
          status
        ],
        (err, data) => {
          const bio = 'Not Set';
          const sex = 'Not Set';
          const phone_number_ns = 'Not Set';
          const age = 'Not Set';
          const address = 'Not Set';

          if (err) return res.status(500).json(err);
          const q =
            'INSERT INTO ementor_db_1.student_about(bio, sex, phone_number, age, address, student_id) VALUES (?,?,?,?,?,?);';

          db.query(
            q,
            [
              bio,
              sex,
              phone_number_ns,
              age,
              address,
              `MAVEN-STUD-000${total_student}`
            ],
            (err, data) => {
              if (err) {
                // console.log('data', data);
                console.log('err', err);
                return res.status(500).json(err);
              } else {
                // res.status(200).json(data);
                const college = 'Not Set';
                const college_yr = 'Not Set';
                const high_school = 'Not Set';
                const hs_yr = 'Not Set';

                const q =
                  'INSERT INTO ementor_db_1.student_education(college, college_yr, high_school, hs_yr, student_id) VALUES (?,?,?,?,?);';

                db.query(
                  q,
                  [
                    college,
                    college_yr,
                    high_school,
                    hs_yr,
                    `MAVEN-STUD-000${total_student}`
                  ],
                  (err, data) => {
                    if (err) {
                      // console.log('data', data);
                      console.log('err', err);
                      return res.status(500).json(err);
                    } else {
                      return res
                        .status(200)
                        .json('Account creation successful!');
                    }
                  }
                );
              }
            }
          );
        }
      );
    });
  });
};

const login = (req, res) => {
  q = 'SELECT * FROM `heroku_064c14c6215e460`.`students` WHERE `email` = ?';

  db.query(q, [req.body.s_email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.s_password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).json('Wrong username or password!');
    } else {
      const id = data[0].id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      });

      const { password, ...others } = data[0];

      res.cookie('user', token, {
        httpOnly: true
      });
      // console.log(req.cookies.user);
      res.status(200).json({ auth: true, token: token, result: others });
    }
    // console.log(`Cookie after login: ` + req.cookies.user);
  });
};

const logout = (req, res) => {
  res.clearCookie('user');
  res.status(200).json('User has been logged out');
  // console.log(`Cookie after deleted:` + req.cookies.user);
};

module.exports = { register, login, logout };
