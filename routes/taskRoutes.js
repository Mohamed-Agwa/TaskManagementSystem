const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const {
  createTask,
  getAllTasks,
  getTaskDetails,
  updateTask,
} = require('../controllers/taskController');
const router = express.Router();
router.post('/', authenticate, authorize(['Manager']), createTask);
router.get('/', authenticate, getAllTasks);
router.get('/:id', authenticate, getTaskDetails);
router.put('/:id', authenticate, authorize(['Manager', 'User']), updateTask);
module.exports = router;
