const express = require('express');
const router = express.Router();

const {
  setFinishBooking
} = require('../../controllers/student/setFinishBooking');

router.post('/', setFinishBooking);

module.exports = router;
