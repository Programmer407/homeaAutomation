/**
 * Created by Irfan on 11-Jun-17.
 */
var switchManager = require('../managers/switchManager');

module.exports ={

    findSwitch:function(data,callback){
        var palaces = data.palace;
        var palaceArray = [];
        for(var j=0;j<palaces.length;j++){
            palaceArray.push(palaces[j].dataValues.palace_id);

        }
        var query_data = {palaces:palaceArray}

        switchManager.getByPalace(query_data).then(function(switches){

            if(switches)
            {
                data.switches = switches;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        });


    },
    updateSwitchStatus:function(data,callback){
        var query_data = {switch_id:data.switch_id,status:data.status};
        switchManager.updateStatusById(query_data).then(function(result){
            if(result)
            {
                data.switch=result;
                callback(null,data);
            }
            else
                callback('error occured in saving sensor value',null);
        })

    }



}