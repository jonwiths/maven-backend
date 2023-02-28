const express = require('express');
const router = express.Router();

const { getMentorAbout } = require('../../controllers/mentor/getMentorAbout');

router.get('/', getMentorAbout);

module.exports = router;
