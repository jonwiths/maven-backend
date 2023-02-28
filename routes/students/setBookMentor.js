const express = require('express');
const router = express.Router();

const { setBookMentor } = require('../../controllers/student/setBookMentor');

router.post('/', setBookMentor);

module.exports = router;
