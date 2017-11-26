var express = require('express');
var router = express.Router();
var jsonWebToken = require('jsonwebtoken');
var cookie= require('cookie-parser');
var model = require('../models');
var secretToken = require('../../config/secretToken');
var userServices = require('../services/userServices');
var homeService = require('../services/homeServices');

/* GET users listing. */


router.post('/',function(req,res,next){

    var data = {email:req.body.username};
    userServices.findUser(data,function(error,data){
        if(error)
            res.end('error occured');
        else
        {
            var user = data.user;
            if(user.length>0){

                if(req.body.password==user[0].dataValues.password){

                    homeService.findHome({user:data.user},function(error,data)
                    {
                        if(error)
                            res.end('invalid credientials');
                        else
                        {
                            var token = jsonWebToken.sign({username:req.body.username,home_id:data.home[0].dataValues.home_id},secretToken.secret);
                            res.statusCode=200;
                            res.cookie('token',token);
                            res.json(token);

                        }



                    });

                }
                else
                    res.end('invalid credientials');
            }

            else
                res.end('invalid credientials');

        }


    });


    /* model.user.findOne({where:{user_name:req.body.username}}).then(function(user){
       console.log(secretToken.secret);
       if(user)
       {
         if(req.body.password==user.password){
           var token = jsonWebToken.sign({username:req.body.username},secretToken.secret);
           res.statusCode=200;
           res.cookie('token',token);
           res.json(token);
         }
       }
       else
       {
         res.end('invalid  crediatenls send  again login page with error');
       }

     }); */


});

router.get('/test',function(req,res){

    console.log('cookie ='+req.cookies.token);
    res.send('done');
});

module.exports = router;
