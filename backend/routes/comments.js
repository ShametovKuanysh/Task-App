const express = require('express');
const router = express.Router();

const { checkUser } = require('../middlewares/auth');
const { getComments, createComment, deleteComment } = require('../controllers/comments')

router.get('/:taskId/comments', checkUser, getComments);
router.post('/:taskId/comments', checkUser, createComment);
router.delete('/comments/:id', checkUser, deleteComment);

module.exports = router