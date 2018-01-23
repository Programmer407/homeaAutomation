/**
 * Created by Irfan on 28-Jun-17.
 */
var express = require('express');

var router = express.Router();




var async= require('async');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');

var homeService = require('../services/homeServices');

module.exports=function(io){

    var micro_io = io.of('/microservice');
    var now_io = io.of('/now');
    var dashboard_io = io.of('/dashboard');

    router.get('/',function(req,res){
        res.end('welcome to microservice world');

    });


    micro_io.on('connection',function(socket ){
        console.log('a microservice connected in /microservice end point');
        socket.on('home',function(msg){
            console.log('microservice connecting to room '+msg.home_id);
           socket.join(msg.home_id);
        });



        socket.on('disconnect',function(){
            console.log('a user disconnected in /microservice end point');
        });

        socket.on('micro_message',function(data){

            if(data.type=='sensor')
            {
                //save it in the db
                //update sensor and sensorlog table;

                async.waterfall([
                    function updateSensor(callback){
                        sensorService.updateSensorValue(data,callback)
                    },
                    function addSensorLog(data,callback){
                        sensorlogService.addSensorLog(data,callback)
                    }//,
                    // function findSensor(data,callback){
                    //   sensorService.findSensorById(data,callback)
                    // },function findHome(data,callback){
                    //  homeService.getOneHomeDetail(data,callback)
                    //
                    // //now check mode and take the required action.if mode is automatic then update the things
                    // //implementation pending


                    // }

                ],function(error,result){
                    if(error)
                        console.log('error in saving logs');
                    else
                    {
                        console.log('sucessfully saved');
                        console.log(result);
                    }

                });

            }
            console.log('a new msg received from microservice '+data);
            now_io.to(data.home_id).emit('sensorStatus',data);
            dashboard_io.to(data.home_id).emit('sensorStatus',data);
        })
    });

    return router;

}