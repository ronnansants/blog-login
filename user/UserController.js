const express = require('express');
const router = express.Router();
const mdUser = require('./User');
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');

router.get('/login', function(req, res){
    res.render('admin/users/login');
})

router.post('/authenticate', function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    mdUser.findOne({
        where: { email: email }
    }).then(function(user){
        if (!user) {
            res.redirect('/login');
        }else{
            bcrypt.compare(password, user.password).then(function(checkPass){
                if (checkPass) {
                    req.session.user = {
                        id: user.id,
                        name: user.name.toUpperCase(),
                        email: user.email
                    }
                    res.redirect('/')
                }else{
                    res.redirect('/login');
                }
            })
        }
    })
})

router.get('/admin/users', adminAuth, function(req, res){
    let data = [];

    mdUser.findAll({
        order: [['id','DESC']],
        attributes: ['id', 'name', 'email'],
    }).then( (user) => {
        data = user;
        res.render('admin/users/users', { items: data });
    }).catch((err) => {
        console.log("Failed on create user. Msg: " + err);
    })
});

router.get('/admin/usersCreate', function(req, res){
    res.render("admin/users/userCreate");
})

router.post('/users/new', adminAuth, function(req, res){
    let name = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let salt = 10;

    mdUser.findOne({where: { email: email } }).then((user)=>{
        if (user) {
            console.log("Email already used.")
        }else{
            bcrypt.hash(password, salt , function(err, hash){
                if(err){
                    return console.log(err);
                }
                else{
                    mdUser.create({
                        name: name,
                        email: email,
                        password: hash
                    }).then(function(){
                        console.log("User "+name+" created successfully")
                        res.redirect("/admin/users");
                    }).catch(function(err){
                        console.log("Error creating new user: hash: "+hash+"\n\n\n"+err);
                    })
                }
            })
        }
    })    
})

router.post('/admin/userDel', adminAuth, function(req, res){
    let id= req.body.id;
    
    mdUser.destroy({where:{id : id}}).then(function() {
        res.redirect('/admin/users');
    }).catch(function(err){
        console.log('Error delete user. Msg: '+err);
    });
        
})

router.get('/logout', function(req,res){
    req.session.destroy(); // destroy the session to log out the user
    res.redirect('/');
})

module.exports = router;