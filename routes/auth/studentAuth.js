const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  changePassword
} = require('../../controllers/auth/studentAuth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password', changePassword);

module.exports = router;
