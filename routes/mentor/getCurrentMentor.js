const express = require('express');
const router = express.Router();

const {
  getCurrentMentor
} = require('../../controllers/mentor/getCurrentMentor');

router.get('/', getCurrentMentor);

module.exports = router;
