const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if ( !username || !password) {
        return res.status(400).json({ error: 'Please enter username and password' });
      }
    if (password.length < 8){
        return res.status(400).json({ error: ' Password length must be atleast 8 characters' });
    }
    const userr = await User.findOne({ where: { username } });
    if (!userr) {
    const user = await User.create({ username, password, role });
    res.status(201).json(user);
    
    }else{
        return res.status(400).json({ error: ' username already exists' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
