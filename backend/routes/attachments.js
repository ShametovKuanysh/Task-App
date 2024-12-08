const express = require('express');
const router = express.Router();

const { checkUser } = require('../middlewares/auth');
const { getTaskAttachments, createTaskAttachment, deleteTaskAttachment } = require('../controllers/attachments')

const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dvnghun9q',
    api_key: '245913617943777',
    api_secret: 'w6f0a8IMbJBFQNGbswt5Z1xwyjo',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        asset_folder: 'books',
        resource_type: 'raw',
    },
});

const upload = multer({ storage });


router.get('/:taskId/attachments', checkUser, getTaskAttachments);
router.post('/:taskId/attachments', checkUser, upload.single('file'), createTaskAttachment);
router.delete('/attachments/:id', checkUser, deleteTaskAttachment);

module.exports = router