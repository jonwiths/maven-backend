const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { db } = require('../../connection/connect');

const setForgotPassword = (req, res) => {
  const { email } = req.body;

  const q = 'SELECT * FROM `heroku_064c14c6215e460`.students WHERE email = ?';
  db.query(q, [email], (err, data) => {
    if (err) return res.status(409).send(err);
    else if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      const q =
        'UPDATE `heroku_064c14c6215e460`.students SET reset_password_token = ?, reset_password_expires = NOW() + INTERVAL 1day WHERE email = ?';

      const token = bcrypt.hash(email, 10);
      db.query(q, [token, email], (err, data) => {
        if (err) return res.status(409).send(err);
        else {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: '<h3> Password Reset Request </h3>',
            html: `<p>You have requested to reset your password. Please click the following link to reset your password:</p>
            <p><a href="http://localhost:3000/reset-password/${token}">Reset Password</a></p>`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({ message: 'Email sent' });
            }
          });
        }
      });
    }
  });
};

module.exports = { setForgotPassword };
