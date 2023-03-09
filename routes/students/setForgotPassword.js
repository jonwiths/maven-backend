const express = require('express');
const router = express.Router();

const {
  setForgotPassword
} = require('../../controllers/student/setForgotPassword');

router.post('/', setForgotPassword);

module.exports = router;
