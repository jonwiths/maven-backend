const express = require('express');
const router = express.Router();

const {
  deleteSchedTimings
} = require('../../controllers/mentor/deleteSchedTimings');

router.post('/', deleteSchedTimings);

module.exports = router;
