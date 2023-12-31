const express = require('express');
const router = express.Router();
const mdCategory = require('../categories/Category')
const mdArticle = require('../articles/Article')
const slug = require('../operations/slug');

router.get('/article=:slug', function(req, res){
    mdArticle.findOne({
        where: {
            slug: req.params.slug
        }
    }).then(function(data){
        if(data){
            res.render('admin/articles/article', {itens: data})
        }else{
            res.redirect('index');
        }
    })
})

router.get('/admin/articles',  (req, res) => {
    mdArticle.findAll({
        order: [['id','DESC']],
        attributes: ['id', 'title', 'slug'],
        include: [{
            model: mdCategory,
            attributes: ['title']
        }]
    }).then((data)=>{
        res.render('admin/articles/articles', { items: data })
    })

})

router.get('/admin/articlesNew', function(req, res) {
    mdCategory.findAll({order: [['title', 'asc']]}).then( itens => {
        res.render('admin/articles/articlesNew',{category: itens })
    })
});

router.post('/admin/articlesSave', function(req, res) {
    const title = req.body.articleTitle;
    const body = req.body.articleBody;
    const category = req.body.articleCategory;
    const id = req.body.articleId;

    if(!id){
        mdArticle.create({title: title, body: body, slug: slug(title), categoryId: category}).then().catch(function(err) {
            console.log('Error when saving new article. msg: '+err);
        })
    }else{
        mdArticle.update(
            {title: title, body: body, slug: slug(title), categoryId: category},
            {where: {id: id}}
        )
    }
    
    res.redirect('/admin/articles')
})

router.post('/admin/articlesEdit/:id',  function(req, res) {
    let id = req.params.id;

    mdArticle.findOne({
        where: {
            id: id}
    }).then(function(article){
        if(article && article != undefined){
            mdCategory.findAll({
                order:[['id','asc']],
                attributes: ['id', 'title']
            }).then((categories) => {
                res.render('admin/articles/articlesEdit', {data: article, category: categories})
            })
        }else{
            res.redirect('/admin/articles')
        }
    }).catch(function(err){
        console.log("Error on find articles to edit. Msg:"+err)
    })
})

router.post('/admin/articlesDel', function(req, res){
    let id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            mdArticle.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                console.log("\n\nArtigo Excluido com sucesso!\n\n");
            })
        }
    }
    res.redirect('/admin/articles');
});

module.exports = router;