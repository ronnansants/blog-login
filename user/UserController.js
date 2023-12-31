const express = require('express');
const router = express.Router();
const mdUser = require('./User');

router.get('/admin/users', function(req, res){
    res.send("Tela de usuarios cadastrados no sistema")
});

router.get('/admin/usersCreate', function(req, res){
    res.render("admin/users/create");
})

module.exports = router;