/**
 * Created by Irfan on 11-Jun-17.
 */
var sensorManager = require('../managers/sensorManager');
var models = require('../models');

module.exports ={

    findSensor:function(data,callback){
        var palaces = data.palace;
        var palaceArray = [];
        for(var j=0;j<palaces.length;j++){
            palaceArray.push(palaces[j].dataValues.palace_id);

        }
        var query_data = {palaces:palaceArray}
        sensorManager.getByPalace(query_data).then(function(sensor){

            if(sensor)
            {
                data.sensor = sensor;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })


    },
    updateSensorValue:function(data,callback){
        var query_data = {sensor_id:data.id,value:data.value};
        sensorManager.updateValueById(query_data).then(function(result){
            if(result)
                 callback(null,data);
            else
                callback('error',null);
        })

    },
  addSensor:function(data,callback){
    const { name,sensorType,palaceId}  =data
    const addObj =  models.sensor.build({name: name, sensorTypeStId:sensorType,palacePalaceId:palaceId,value:0});
    sensorManager.addSensor(addObj).then(function(obj){
      callback(null,obj)

    })
  }



}