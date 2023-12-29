const seq = require('sequelize');
var connect = require('../database/database');

const Category = connect.define('categories', {
    title:{
        type:seq.STRING,
        allowNull:false
    },
    slug:{
        type:seq.STRING,
        allowNull: false
    }
});

module.exports = Category;