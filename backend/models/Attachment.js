const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const Task = require('./Task');

const Attachment = sequelize.define('Attachment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Task,
            key: 'id',
        },
    },
    filePath: DataTypes.STRING,
}, {
    tableName: 'attachments',
    timestamps: false,
})

module.exports = Attachment;