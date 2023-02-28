const express = require('express');
const router = express.Router();

const {
  getSpecificMentor
} = require('../../controllers/student/getSpecificMentor');

router.get('/', getSpecificMentor);

module.exports = router;
