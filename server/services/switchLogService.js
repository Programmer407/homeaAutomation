
var switchlogManager = require('../managers/switchlogManager');
var dateformat = require('dateformat');

module.exports ={

    findBulbSwitchLog:function(data,callback){

        var switches = data.switches;

        var switchesArray = [];

        for(var j=0;j<switches.length;j++){
            switchesArray.push(switches[j].dataValues.switch_id);


        }
        var date =new Date();
        date.setDate(date.getDate()-1);
        var query_data = {switches:switchesArray,date:date};

        switchlogManager.getBulbLog(query_data).then(function(bulblogs){


            if(bulblogs)
            {
                data.bulb_log = bulblogs;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })



    },

    findFanSwitchLog:function(data,callback){
        var switches = data.switches;

        var switchesArray = [];

        for(var j=0;j<switches.length;j++){
            switchesArray.push(switches[j].dataValues.switch_id);


        }
        var date =new Date();
        date.setDate(date.getDate() -1);
        var query_data = {switches:switchesArray,date:date};
        switchlogManager.getFanLog(query_data).then(function(fanlog){


            if(fanlog)
            {
                data.fan_log = fanlog;
                callback(null,data);
            }
            else
                callback('errror occured at getting switches',null);

        })



    },

    addSwitchLog:function(data,callback){
        var now_date = new Date();
        var query_data = {
            switch_id:data.switch_id,
            status:data.status,
            time:dateformat(now_date,'isoTime'),
            date:dateformat(now_date,'isoDate')

        }

        var switches = data.switches;
        let total =0;
        let total_on=0;
        console.log('switches')

      console.log(data.appliance_id)
      console.log('data of switch')
      console.log(data)
        for(var i=0;i<switches.length;i++){
            console.log("inside the loop of switches ")

            if(switches[i].dataValues.applianceApplianceId==data.appliance_id)
            {
                total++;
                if(switches[i].dataValues.status==1)
                    total_on++;

            }

        }
        query_data.total =total;
        query_data.total_on=total_on;



        switchlogManager.addLogbyId(query_data).then(function(result){
            callback(null,data)
        }).catch(function(error){
            console.log('error occure'+error);
            callback('error occured in saving log here it is '+error,null);
        })


    }



}