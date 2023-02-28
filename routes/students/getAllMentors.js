const express = require('express');
const router = express.Router();

const { getAllMentors } = require('../../controllers/student/getAllMentors');

router.get('/', getAllMentors);

module.exports = router;
