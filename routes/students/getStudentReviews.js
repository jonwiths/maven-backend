const express = require('express');
const router = express.Router();

const {
  getStudentReviews
} = require('../../controllers/student/getStudentReviews');

router.get('/', getStudentReviews);

module.exports = router;
