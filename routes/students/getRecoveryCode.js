const express = require('express');
const router = express.Router();

const {
  getRecoveryCode
} = require('../../controllers/student/getRecoveryCode');

router.get('/', getRecoveryCode);

module.exports = router;
