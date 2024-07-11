const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const {getAllUsers , createUser} = require('../controllers/userController');

router.post('/',  authenticate, authorize(['Manager']), createUser);
router.get('/', authenticate, authorize(['Manager']), getAllUsers);

module.exports = router;
