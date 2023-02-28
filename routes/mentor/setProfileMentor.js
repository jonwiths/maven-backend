const express = require('express');
const router = express.Router();

const {
  setProfileMentorProfile,
  setProfileMentorAbout,
  setProfileMentorEducation
} = require('../../controllers/mentor/setProfileMentor');

router.post('/profile', setProfileMentorProfile);
router.post('/about', setProfileMentorAbout);
router.post('/education', setProfileMentorEducation);

module.exports = router;
