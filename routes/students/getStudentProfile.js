const express = require('express');
const router = express.Router();

const {
  getStudentProfileAbout,
  getStudentProfileEducation
} = require('../../controllers/student/getStudentProfile');

router.get('/about', getStudentProfileAbout);
router.get('/education', getStudentProfileEducation);

module.exports = router;
