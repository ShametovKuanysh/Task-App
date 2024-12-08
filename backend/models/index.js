const sequelize = require('./../db/index')
const User = require('./User')
const Task = require('./Task')
const Comment = require('./Comment')
const Attachment = require('./Attachment')

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' })
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments' })
Comment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' })

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' })
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Task.hasMany(Attachment, { foreignKey: 'taskId', as: 'tasks'})
Attachment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' })


module.exports = {sequelize, User, Task, Attachment, Comment}