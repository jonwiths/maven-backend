const express = require('express');
const router = express.Router();

const { setSchedTimings } = require('../../controllers/mentor/setSchedTimings');

router.post('/', setSchedTimings);

module.exports = router;
