/**
 * Created by Irfan on 02-Jul-17.
 */
var express = require('express');

var router = express.Router();
var jwt = require('jsonwebtoken');

var activitylogService = require('../services/activitylogServices');



module.exports = function(io){


    router.get('/',function(req,res){

        res.end('You are in /history page');
    })

    router.get('/activity_log',function(req,res){

                activitylogService.findActivity({home_id:1},function(error,data){

                    if(error)
                        res.end('error in getting log')
                    else
                    {
                        var final_data={
                            logs:[]
                        };
                        var logs = data.activity_log;
                        console.log('array '+ logs);
                        for(let i=0;i<logs.length;i++){
                            var one_record= logs[i];
                            console.log(one_record)
                            console.log('good');

                            var msg = 'In Floor "' +one_record.floor.dataValues.name + '"   ,';
                            msg = msg + 'Palace name "' +one_record.palace.dataValues.name + '"   , ';
                            msg = msg + 'Switch of "' +one_record.switch.dataValues.name + '"   , ';
                            if(one_record.dataValues.aid==1)
                                msg = msg + 'Turn " ON " By "' +one_record.user.dataValues.name + '"  .';
                            else
                                msg = msg + 'Turn " OFF " By "' +one_record.user.dataValues.name + '"  .';

                            final_data.logs.push({msg,time:one_record.dataValues.date});


                        }
                        res.send({history:final_data});


                    }

                })


    });


    return router;
};