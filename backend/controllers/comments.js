const { Comment, User } = require('../models')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { taskId: req.params.taskId },
            include: [{ model: User, attributes: ['username'], as: 'user' }],
        });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error on server' });
    }
}

const createComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            taskId: req.params.taskId,
            userId: req.user.userId,
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error on server' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.destroy();

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error on server' });
    }
}


module.exports = {
    getComments,
    createComment,
    deleteComment,
};