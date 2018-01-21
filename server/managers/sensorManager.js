/**
 * Created by Irfan on 11-Jun-17.
 */

var models = require('../models');

module.exports = {

    getByPalace:function(query_data)
    {

        return models.sensor.findAll({where:{palacePalaceId:query_data.palaces},include:models.sensor_type})
    },
    updateValueById:function(query_data){

        return models.sensor.update({  value:query_data.value},{ where:{sensor_id:query_data.sensor_id}});



    },
  addSensor:function(Obj){

    return Obj.save()
  },
  getById:function(Obj){

    return  models.sensor.findOne({where:{sensor_id:obj.sensor_id},include:models.sensor_type})
  }



}