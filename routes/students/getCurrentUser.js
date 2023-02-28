const express = require('express');
const router = express.Router();

const {
  getCurrentStudent
} = require('../../controllers/student/getCurrentUser');

router.get('/', getCurrentStudent);

module.exports = router;
