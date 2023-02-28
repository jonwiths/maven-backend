const express = require('express');
const router = express.Router();

const {
  getBookedMentors
} = require('../../controllers/student/getBookedMentors');

router.get('/', getBookedMentors);

module.exports = router;
