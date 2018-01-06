/**
 * Created by Irfan on 11-Jun-17.
 */
var homeManager = require('../managers/homeManager');

var models = require('../models');

module.exports ={

    findHome:function(data,callback){
        console.log('find home called')
        console.log('data object'+data);
       var user=data.user;

        var query_data={account:user[0].dataValues.accountAccountId}

        homeManager.getByAccount(query_data).then(function(home){

            if(home)
            {
                data.home = home;
                callback(null,data);
            }

            else
                callback('error in getting home data',null);


        });


    },
  addHome:function(data,callback){
      const { name,description,accountId} =data
      const addObj =  models.home.build({name: name, description:description,accountAccountId:accountId,modeId:1});
      homeManager.addHome(addObj).then(function(obj){
        callback(null,obj)

      })
  }




  }



