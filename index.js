const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://mave-edu.herokuapp.com',
      'https://maven-edu.netlify.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use((req, res, next) => {
  const allowedOrigins = [
    'https://maven-edu.netlify.app',
    'https://mave-edu.herokuapp.com'
  ];
  const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   // res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, withCredentials'
  );
  next();
});

const getTotalStatsRoute = require('./routes/landing-page/getStats');
const setMentorMeetingSched = require('./routes/landing-page/setMentorMeetingSched');

const studentAuthRoute = require('./routes/auth/studentAuth');
const getAllMentors = require('./routes/students/getAllMentors');
const getCurrentUser = require('./routes/students/getCurrentUser');
const getSchedTimings = require('./routes/students/getSchedTimings');
const getBookedMentors = require('./routes/students/getBookedMentors');
const setBookMentor = require('./routes/students/setBookMentor');
const getStudentHistory = require('./routes/students/getStudentHistory');
const setReviews = require('./routes/students/setReviews');
const updateStudentAboutProfile = require('./routes/students/updateStudentProfile');
const getStudentProfile = require('./routes/students/getStudentProfile');
const getRecoveryCode = require('./routes/students/getRecoveryCode');
const getSpecificMentor = require('./routes/students/getSpecificMentor');
const getStudentReviews = require('./routes/students/getStudentReviews');
const setStudentForgotPassword = require('./routes/students/setForgotPassword');
const updateStudentPassword = require('./routes/students/setResetPassword');
const getResetPassword = require('./routes/students/getResetPassword');

const mentorAuthRoute = require('./routes/auth/mentorAuth');
const getCurrentMentor = require('./routes/mentor/getCurrentMentor');
const setSchedTimings = require('./routes/mentor/setSchedTimings');
const getMentorSummary = require('./routes/mentor/getMentorSummary');
const getMentorAbout = require('./routes/mentor/getMentorAbout');
const getProfileMentor = require('./routes/mentor/getProfileMentor');
const setProfileMentor = require('./routes/mentor/setProfileMentor');
const getBookedStudents = require('./routes/mentor/getBookedStudents');
const getOwnTimings = require('./routes/mentor/getOwnTimings');
const deleteSchedTimings = require('./routes/mentor/deleteSchedTimings');
const updateProfileMentor = require('./routes/mentor/updateProfileMentor');
const setFinishBooking = require('./routes/mentor/setFinishBooking');
const getReviews = require('./routes/mentor/getReviews');
const getMentorHistory = require('./routes/mentor/getMentorHistory');

const setMentorForgotPassword = require('./routes/mentor/setForgotPassword');
const updateMentorPassword = require('./routes/mentor/setResetPassword');
const getMentorResetPassword = require('./routes/mentor/getResetPassword');

//   const token = req.headers['x-access-token'];
//   if (!token) {
//     res.status(500).json('No token sent in headers');
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
//       if (err) {
//         res
//           .status(500)
//           .json({ auth: false, message: 'Failed to authenticate' });
//       } else {
//         req.userId = data.id;
//         next();
//       }
//     });
//   }
// };

app.use('/api/v1', getTotalStatsRoute);
app.use('/api/v1/set-mentor-sched', setMentorMeetingSched);

app.use('/api/student/auth', studentAuthRoute);
app.use('/api/student/current-user', getCurrentUser);
app.use('/api/student/get-all-mentors', getAllMentors);
app.use('/api/student/get-sched-timings', getSchedTimings);
app.use('/api/student/get-booked-mentors', getBookedMentors);
app.use('/api/student/set-book-mentor', setBookMentor);
app.use('/api/student/get-student-history', getStudentHistory);
app.use('/api/student/set-student-review', setReviews);
app.use('/api/student/update', updateStudentAboutProfile);
app.use('/api/student/profile', getStudentProfile);
app.use('/api/student/get-student-reviews', getStudentReviews);
app.use('/api/student/set-student-forgot-password', setStudentForgotPassword);
app.use('/api/student/update-student-password', updateStudentPassword);
app.use('/api/student/reset-password/:token', getResetPassword);

app.use('/api/student/get-recovery-code', getRecoveryCode);
app.use('/api/student/get-specific-mentor', getSpecificMentor);

//

app.use('/api/mentor/auth', mentorAuthRoute);
app.use('/api/mentor/current-mentor', getCurrentMentor);
app.use('/api/mentor/set-sched-timings', setSchedTimings);
app.use('/api/mentor/get-mentor-summary', getMentorSummary);
app.use('/api/mentor/get-mentor-about', getMentorAbout);
app.use('/api/mentor/profile', getProfileMentor);
app.use('/api/mentor/profile', setProfileMentor);
app.use('/api/mentor/get-booked-students', getBookedStudents);
app.use('/api/mentor/get-own-timings', getOwnTimings);
app.use('/api/mentor/delete-own-timings', deleteSchedTimings);
app.use('/api/mentor/update', updateProfileMentor);
app.use('/api/mentor/set-finish-booking', setFinishBooking);
app.use('/api/mentor/get-reviews', getReviews);
app.use('/api/mentor/get-mentor-history', getMentorHistory);

app.use('/api/mentor/set-mentor-forgot-password', setMentorForgotPassword);
app.use('/api/mentor/update-mentor-password', updateMentorPassword);
app.use('/api/mentor/reset-password/:token', getMentorResetPassword);

console.log('Start');

app.get('/', (req, res) => {
  res.send('MAVEN EDU!');
  console.log('WELCOME TO HOME');
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);

console.log('End');
