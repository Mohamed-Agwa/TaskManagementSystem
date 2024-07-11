const { User } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

  if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")){
    return res.status(400).send('Invalid Data');
  }
  const { username, password } = req.body;
  if ( !username || !password) {
    return res.status(400).json({ error: 'Please enter username and password' });
  }

  const user = await User.findOne({ where: { username } });
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({ error: 'Username or password incorrect' });
  }

  const token = jwt.sign({ id: user.id , role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token,
  });
};

module.exports = { login };
