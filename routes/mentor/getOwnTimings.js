const express = require('express');
const router = express.Router();

const { getOwnTimings } = require('../../controllers/mentor/getOwnTimings');

router.get('/', getOwnTimings);

module.exports = router;
