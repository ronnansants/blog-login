const sequelize = require('sequelize');
const connect = require('../database/database');

const User = connect.define('users',{
    name: {
        type : sequelize.STRING,
        allowNull: true,
        unique: false 
    },
    email: {
        type : sequelize.STRING, 
        allowNull: false,
        unique: true 
    },
    password: {
        type: sequelize.HSTORE,
        allowNull: false 
    }
});

User.sync({force: false});

module.exports= User;