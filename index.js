const express = require('express');
const app = express();
const connection = require('./database/database');
const CtlrUsers = require("./user/UserController");
const CtlrCategories = require('./categories/CategoriesController');
const mdCategory = require('./categories/Category');
const CtlrArticles = require('./articles/ArticlesController');
const mdArticle = require('./articles/Article');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// INSTANCIAR CONTOLADOR
app.use('/', CtlrCategories);
app.use('/',CtlrArticles);
app.use('/', CtlrUsers);


connection.authenticate().then(()=> {
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch((err)=>{
    console.log(err);
})

app.get('/', function(req, res) {
    mdArticle.findAll({
        order: [['id', 'desc']],
        attributes: ['title', 'body', 'slug']
    }).then(function(data) {
        res.render('index', {itens: data});
    }).catch(function(err){
        console.log('Error in homepage, do not possible catch data of articles. Msg:'+err)
    })
})

app.listen(2205, ()=>{
    console.log('Server is running on port 2205');
})