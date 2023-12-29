const sequelize = require('sequelize');
const connection = new sequelize('mypress', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    timezone: '-03:00'
});

module.exports = connection;