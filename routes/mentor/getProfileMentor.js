const express = require('express');
const router = express.Router();

const {
  getProfileMentorProfile,
  getProfileMentorAbout,
  getProfileMentorEducation
} = require('../../controllers/mentor/getProfileMentor');

router.get('/profile', getProfileMentorProfile);
router.get('/about', getProfileMentorAbout);
router.get('/education', getProfileMentorEducation);

module.exports = router;
