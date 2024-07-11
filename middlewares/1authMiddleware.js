const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(verified.id);
    next();
  } catch (err) {
    console.log("ERRORRRRR FOR AUTHENTICATION" + err)
    res.status(400).send('Invalid Token');
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Permission Denied');
    }
    next();
  };
};

module.exports = { authenticate, authorize };
