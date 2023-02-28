const express = require('express');
const router = express.Router();

const {
  updateProfileMentorAbout,
  updateProfileMentorExperience,
  updateProfileMentorEducation,
  updateProfileMentorSocial
} = require('../../controllers/mentor/updateProfileMentor');

router.put('/about', updateProfileMentorAbout);
router.put('/experience', updateProfileMentorExperience);
router.put('/education', updateProfileMentorEducation);
router.put('/social', updateProfileMentorSocial);

module.exports = router;
