/**
 * Created by Irfan on 11-Jun-17.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var jwt = require('jsonwebtoken');
var models = require('../models');


//services
var userServices = require('../services/userServices');
var homeService = require('../services/homeServices');
var floorService = require('../services/floorServices');
var palaceService = require('../services/palaceServices');
var switchService = require('../services/switchServices');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');






module.exports= function(io){
    var now_io = io.of('/now');
    var micro_io = io.of('/microservice');
    router.get('/',function(req,res,next){


        console.log('auth ='+req.get('Authorization'));
        var  Stringtoken = req.get('Authorization');
        var StringTokenArray = Stringtoken.split(' ');

        var token = StringTokenArray[1];

        jwt.verify(token, 'irfanbsse2060', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log('decoded'+req.decoded);
                console.log(req.decoded.username);

                var data = {
                    email:req.decoded.username
                }
                async.waterfall([

                    function findUser(callback){
                        userServices.findUser(data,callback);

                    },
                    function findHome(data,callback){
                        homeService.findHome(data,callback);

                    },
                    function findFloor(data,callback){
                        floorService.findFloor(data,callback);

                    },
                    function findPalace(data,callback){
                        palaceService.findPalace(data,callback);
                    },
                    function findSwitch(data,callback)
                    {
                        switchService.findSwitch(data,callback);
                    },
                    function findSensor(data,callback){

                        sensorService.findSensor(data,callback);
                    }




                ],function(error,result){

                    if(error)
                        console.log('error = '+error)
                    else
                    {
                        var nowData = {
                            floors:[],
                            palaces:[],
                            switches:[],
                            sensors:[],
                            mode:{}

                        }



                        nowData.mode.id=result.home[0].dataValues.mode.dataValues.id;
                        nowData.mode.name=result.home[0].dataValues.mode.dataValues.name;

                        for(var i=0;i<result.switches.length;i++) {
                            nowData.switches.push(result.switches[i].dataValues);
                        }

                        for(var j=0;j<result.sensor.length;j++) {
                            nowData.sensors.push(result.sensor[j].dataValues);
                        }
                        for(var k=0;k<result.floor.length;k++) {
                            nowData.floors.push(result.floor[k].dataValues);


                        }
                        for(var m=0;m<result.palace.length;m++) {
                            nowData.palaces.push(result.palace[m].dataValues);


                        }


                        console.log('now data ='+nowData);
                          res.json(nowData);

                       // res.render('now',{nowData});

                    }



                });










            }
        });


    });

    now_io.on('connection',function(socket ){
       console.log('a new user connected in /now end point');


        socket.on('token',function(data) {


            jwt.verify(data.token, 'irfanbsse2060', function (err, decoded) {
                if (err) {
                    console.log('error')
                } else {

                    console.log('In /now end point i am connecting to room '+decoded.home_id);
                    socket.join(decoded.home_id);


                }


            });
        });






        socket.on('relay',function(data){
            var receive_data = data;

            //save it in the db
              //update relay and relaylog table.
            async.waterfall([


                function findFloor(callback){
                    floorService.findFloor(data,callback);

                },
                function findPalace(data,callback){
                    palaceService.findPalace(data,callback);
                },
                function findSwitch(data,callback)
                {
                    switchService.findSwitch(data,callback);
                },
                function updateSwitchStatus(data,callback){
                    switchService.updateSwitchStatus(data,callback);

                },
                function addSwitchLog(data,callback){

                    switchLogService.addSwitchLog(data,callback);
                }




            ],function(error,result) {

                if (error)
                    console.log('error = ' + error)
                else
                    console.log('successfully saved');




            });



            //send it to gateway raspberry pi
            micro_io.to(data.home_id).emit('message',receive_data);
            console.log('done');
        });

        socket.on('disconnect',function(){
            console.log('a user disconnected in /dashboard end point');
        })



    });



    return router;
};