const express = require('express');
const MdCategory = require('./Category');
const router = express.Router();
const slug = require('../operations/slug');
const adminAuth = require('../middleware/adminAuth')

router.get('/categories',  (req, res) => {
    res.send('ROTA DE CATEGORIAS')
})

router.get('/admin/categories', function(req,res) {
    MdCategory.findAll({
        order: [ ['id', 'desc'] ],
        attibute: ['id', 'title', 'slug'],
        raw: true
    }).then((list) => {
        if(list){
            res.render('admin/categories/categories', {
                items: list
            });
        }else {
            res.render('admin/categories/categories', {
                items: null
            });
        }
    })    
});

router.post('/admin/categories/delete', adminAuth, function(req, res){
    let id = req.body.id;
    console.log("\n\nID:"+id+"\n\n");

    if(id != undefined){
        if(!isNaN(id)){
            MdCategory.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                console.log("\n\nCategoria Excluida com sucesso!\n\n");
            })
        }
    }
    res.redirect('/admin/categories');
});

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    MdCategory.findByPk(id).then(category => {
        if (category) {
            res.render('admin/categories/categoriesEdit', {item: category})
        }else{
            res.redirect('/admin/categories');
        }
    })
})

router.post('/admin/categories/edit/:id', (req, res) => {
    let id = req.body.titleId;
    let title = req.body.titleCategory.toUpperCase();

    MdCategory.update({title: title, slug: slug(title)},{
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    }).catch((err)=>{
        console.log("Erro ao editar a Categoria!\n"+err);
    })
});

router.post('/admin/categoriesNew', adminAuth, function(req, res){
    let tit = req.body.titleCategory.toUpperCase();

    if(tit != undefined && tit.trim() !== ''){
        MdCategory.create({
            title: tit,
            slug: slug(tit)
        });
    } else {
        console.log('NENHUM TITULO INFORMADO');
    }

    res.redirect("/admin/categories");
});

module.exports = router;