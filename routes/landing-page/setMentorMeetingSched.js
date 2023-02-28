const express = require('express');
const router = express.Router();

const {
  setMentorMeetingSched
} = require('../../controllers/landing-page/setMentorMeetingSched');

router.post('/', setMentorMeetingSched);

module.exports = router;
