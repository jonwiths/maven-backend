const express = require('express');
const router = express.Router();

const {
  getMentorSummary
} = require('../../controllers/mentor/getMentorSummary');

router.get('/', getMentorSummary);

module.exports = router;
