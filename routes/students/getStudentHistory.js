const express = require('express');
const router = express.Router();

const {
  getStudentHistory
} = require('../../controllers/student/getStudentHistory');

router.get('/', getStudentHistory);

module.exports = router;
