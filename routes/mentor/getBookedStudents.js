const express = require('express');
const router = express.Router();

const {
  getBookedStudents
} = require('../../controllers/mentor/getBookedStudents');

router.get('/', getBookedStudents);

module.exports = router;
