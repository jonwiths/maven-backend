const express = require('express');
const router = express.Router();

const {
  setFinishBooking
} = require('../../controllers/mentor/setFinishBooking');

router.post('/', setFinishBooking);

module.exports = router;
