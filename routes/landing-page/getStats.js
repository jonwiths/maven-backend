const express = require('express');
const router = express.Router();

const {
  getTotalMentors,
  getTotalStudents
} = require('../../controllers/landing-page/getStats');

router.get('/get-total-mentors', getTotalMentors);
router.get('/get-total-students', getTotalStudents);

module.exports = router;
