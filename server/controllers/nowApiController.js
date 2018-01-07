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


                var data = {
                    email:'ali@gmail.com'
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
                          res.send({now:nowData});

                       // res.render('now',{nowData});

                    }



                });




    });

  router.post('/changeSwitchStatus',function(req,res,nex){
    console.log('/changeSwitchStatus called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    const { switch_id,status} = body
    if ( !switch_id || !status ) {
      rejectRequest('Missing required arguments', res)
      return
    }

    switchService.updateSwitchStatus({ switch_id,status},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })

      const { user } = req

      if(user.accountAccountId){
        console.log('sending message to room '+user.accountAccountId);
        now_io.to(data.accountAccountId).emit('msg',{ switch_id,status} );
      }

    })


  });

    now_io.on('connection',function(socket ){
       console.log('a new user connected in /now end point');


      socket.on('token',function(data) {

        let {user} = data.user;
        console.log('user' + user);
        console.log('In /now end point i am connecting to room ' + user.accountAccountId);
        socket.join(user.accountAccountId);

      })






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