/**
 * Created by Irfan on 11-Jun-17.
 */

var sensorlogManager  = require('../managers/sensorlogManager');
var  dateformat = require('dateformat');

module.exports  = {

    findTempSensorLog:function(data,callback){

        var sensor = data.sensor;
        var dashboarUserdata = data.dashboard_userdata;



        var sensorArray = [];


        for(var j=0;j<sensor.length;j++){
            if(sensor[j].dataValues.sensorTypeStId==1 )
                sensorArray.push(sensor[j].dataValues.sensor_id);

        }
        var listofgraph=[]
        for(var i=0;i<dashboarUserdata.length;i++){
            if(dashboarUserdata[i].dataValues.area=='graph_area')
            {
                for(var k=0;k<data.sensor.length;k++){
                    if(data.sensor[k].dataValues.palacePalaceId==dashboarUserdata[i].dataValues.palacePalaceId)
                    {
                       if(data.sensor[k].dataValues.sensorTypeStId==1)
                            listofgraph.push(data.sensor[k].dataValues.sensor_id);

                    }

                }
            }




        }

        var date =new Date();
        date.setDate(date.getDate()-2);
        var query_data = {sensors:listofgraph,date:date};
        sensorlogManager.getTempLog(query_data).then(function(templog){
            if(templog)
            {
                data.temp_sensor_log = templog;
                callback(null, data);

            }
            else
                callback('error in getting temp sensor log',null);


        });


    },
    findLightSensorLog:function(data,callback){

        var sensor = data.sensor;

        var dashboarUserdata = data.dashboard_userdata;
        var sensorArray = [];
        for(var j=0;j<sensor.length;j++){

            if(sensor[j].dataValues.sensorTypeStId==2)
                sensorArray.push(sensor[j].dataValues.sensor_id);

        }
        var listofgraph=[]
        for(var i=0;i<dashboarUserdata.length;i++){
            if(dashboarUserdata[i].dataValues.area=='graph_area')
            {
                for(var k=0;k<data.sensor.length;k++){
                    if(data.sensor[k].dataValues.palacePalaceId==dashboarUserdata[i].dataValues.palacePalaceId)
                    {
                        if(data.sensor[k].dataValues.sensorTypeStId==2)
                            listofgraph.push(data.sensor[k].dataValues.sensor_id);

                    }

                }
            }




        }
        var date =new Date();
        date.setDate(date.getDate()-2);
        var query_data = {sensors:listofgraph,date:date};

        sensorlogManager.getLightLog(query_data).then(function(lightlog){
            if(lightlog)
            {
                data.light_sensor_log = lightlog;
                callback(null,data);

            }
            else
            {
                callback('error in getting light sensor log',null);
            }



        });


    },

    addSensorLog:function(data,callback){
        var now_date = new Date();
        var query_data = {
            sensor_id:data.sensor_id,
            value:data.value,
            time:dateformat(now_date,'isoTime'),
            date:dateformat(now_date,'isoDate')

        }

        sensorlogManager.addLogbyId(query_data).then(function(result){
              console.log(result);
              callback(null,data);

        }).catch(function(error){
            callback('error occured in saving sensor log '+error,null)
        })




    }






}