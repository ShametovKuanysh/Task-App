const { Task } = require('../models')

const getMyTasks = async (req, res) => {
    try {
        const { page, pageSize } = req.query || { page: 1, pageSize: 8 };

        const tasks = await Task.findAll({ 
            where: { userId: req.user.userId },
            order: ['createdAt'],
            offset: (page - 1) * pageSize,
            limit: pageSize
        });

        const totalTasks = await Task.count()

        // const totalTasks

        res.json({tasks,totalTasks});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, { where: { userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, deadline } = req.body;

        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            deadline,
            userId: req.user.userId,
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const createTasks = async (req, res) => {
    try {
        const tasks = req.body.map(async (task) => {
            const { title, description, status, priority, deadline } = task;

            return await Task.create({
                title,
                description,
                status,
                priority,
                deadline,
                userId: req.user.userId,
            });
        });

        const createdTasks = await Promise.all(tasks);

        res.status(201).json(createdTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, { where: { userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await task.update(req.body);

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, { where: { userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getMyTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createTasks
}