const express = require('express');
const router = express.Router();

const {
  setStudentAboutProfile
} = require('../../controllers/student/setStudentProfile');

router.post('/', setStudentAboutProfile);

module.exports = router;
