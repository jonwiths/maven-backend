const express = require('express');
const router = express.Router();

const {
  getSchedTimings
} = require('../../controllers/student/getSchedTimings');

router.get('/', getSchedTimings);

module.exports = router;
