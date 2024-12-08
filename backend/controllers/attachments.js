const { Attachment } = require('../models')


const getTaskAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.findAll({ where: { taskId: req.params.taskId } });

        res.json(attachments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const createTaskAttachment = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = req.file.path;

        const attachment = await Attachment.create({
            taskId: req.params.taskId,
            filePath: fileUrl,
        })

        res.json({
            message: 'File uploaded successfully!',
            attachment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteTaskAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findByPk(req.params.id);
        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        await attachment.destroy();

        res.json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getTaskAttachments,
    createTaskAttachment,
    deleteTaskAttachment,
}
