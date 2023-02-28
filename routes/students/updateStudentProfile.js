const express = require('express');
const router = express.Router();

const {
  updateStudentAboutProfile,
  updateStudentEducationProfile
} = require('../../controllers/student/updateStudentProfile');

router.put('/about', updateStudentAboutProfile);
router.put('/education', updateStudentEducationProfile);

module.exports = router;
