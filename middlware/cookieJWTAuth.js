const jwt = require('jsonwebtoken');

const cookieJWTAuth = (req, res, next) => {
  const token = req.cookies.user;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = user[0].id;
    console.log(id);
    next();
  } catch (err) {
    res.clearCookie('user');
    return res.redirect('/');
  }
};

module.exports = { cookieJWTAuth };
