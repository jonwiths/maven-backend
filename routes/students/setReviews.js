const express = require('express');
const router = express.Router();

const { setReviews } = require('../../controllers/student/setReviews');

router.post('/', setReviews);

module.exports = router;
