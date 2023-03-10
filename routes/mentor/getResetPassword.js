const express = require('express');
const router = express.Router();

const {
  getResetPassword
} = require('../../controllers/mentor/getResetPassword');

router.get('/', getResetPassword);

module.exports = router;
