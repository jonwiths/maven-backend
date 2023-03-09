const express = require('express');
const router = express.Router();

const {
  setResetPassword
} = require('../../controllers/student/setResetPassword');

router.put('/', setResetPassword);

module.exports = router;
