const express = require('express');
const router = express.Router();

const { checkUser } = require('../middlewares/auth');
const { getMyTasks, getTaskById, createTask, updateTask, deleteTask, createTasks } = require('../controllers/tasks')

router.get('/', checkUser, getMyTasks);
router.get('/:id', checkUser, getTaskById);
router.post('/', checkUser, createTask);
router.put('/:id', checkUser, updateTask);
router.delete('/:id', checkUser, deleteTask);
router.post('/sync', checkUser, createTasks)

module.exports = router