const seq = require('sequelize');
const connect = require('../database/database');
const category = require('../categories/Category');

const Article = connect.define('article',{
    title:{
        type: seq.STRING,
        allowNull: false
    },
    body:{
        type: seq.TEXT,
        allowNull: false
    },
    slug: {
        type: seq.STRING,
        allowNull: false,
    }
});

category.hasMany(Article); // Tem muitos
Article.belongsTo(category); // Pertence à

module.exports = Article;