const { DataTypes } = require('sequelize')
const sequelize = require('../db/index')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
}, {
    tableName: 'users',
    timestamps: true,
})

module.exports = User