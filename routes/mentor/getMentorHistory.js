const express = require('express');
const router = express.Router();

const {
  getMentorHistory
} = require('../../controllers/mentor/getMentorHistory');

router.get('/', getMentorHistory);

module.exports = router;
