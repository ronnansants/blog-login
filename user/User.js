const sequelize = require('sequelize');
const connect = require('../database/database');

const User = connect.define('users',{
    name: {
        type : sequelize.STRING,
        allowNull: false,
        unique: true 
    },
    email: {
        type : sequelize.STRING, 
        allowNull: false,
        unique: true 
    },
    password: {
        type: sequelize.STRING,
        allowNull: false, 
    },
    acessToken: {
        type: sequelize.STRING,
        allowNull: true
    },
    profile:{
        type: sequelize.BLOB('long'),
        allowNull: true
    }
});

User.sync({force: false});

module.exports= User;