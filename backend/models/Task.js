const { DataTypes } = require('sequelize')
const sequelize = require('../db/index')
const User = require('./User')


const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    deadline: DataTypes.DATE,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'tasks',
    timestamps: true,
})

module.exports = Task