const express = require('express');
const router = express.Router();

const {
  setResetPassword
} = require('../../controllers/mentor/setResetPassword');

router.put('/', setResetPassword);

module.exports = router;
