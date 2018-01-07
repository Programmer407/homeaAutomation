/**
 * Created by Irfan on 11-Jun-17.
 */
var floorManager = require('../managers/floorManager');
var models = require('../models');

module.exports ={

    findFloor:function(data,callback){

        var query_data;
       if(data.home)
       {
           var home = data.home;
            query_data = {home_id:home[0].dataValues.home_id}
       }
       if(data.home_id)
       {
           query_data = {home_id:data.home_id};
       }

        floorManager.getByhome(query_data).then(function(floor){

            if(floor)
            {
                data.floor = floor;
                callback(null,data);
            }

            else
                callback('error in getting floor data',null);


        });


    },
  addFloor:function(data,callback){
    const { name,homeId,floortype} =data
    const addObj =  models.floor.build({name: name, homeHomeId:homeId,floorTypeFloorId:floortype});
    floorManager.addFloor(addObj).then(function(obj){
      callback(null,obj)

    })
  },





}