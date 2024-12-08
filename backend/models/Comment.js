const { DataTypes } = require('sequelize')
const sequelize = require('../db/index')
const User = require('./User')
const Task = require('./Task')


const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Task,
            key: 'id',
        },
    }
}, {
    tableName: 'comments',
    timestamps: true,
})

module.exports = Comment