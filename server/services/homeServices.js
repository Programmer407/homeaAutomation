/**
 * Created by Irfan on 11-Jun-17.
 */
var homeManager = require('../managers/homeManager');

var models = require('../models');

module.exports ={

    findHome:function(data,callback){
        console.log('find home called')
        console.log('data object'+data);

        console.log('type of callback' +typeof callback)

        if(data.user)
        {
          var user=data.user;

          var query_data={account:user[0].dataValues.accountAccountId}
        }
        else
          var query_data={account:data.account}


          console.log('query data')
      console.log(query_data)


        homeManager.getByAccount(query_data).then(function(home){

            if(home)
            {
              console.log('home result')
              console.log(home)
              if(data.user)
              {
                data.home = home;
                callback(null,data);
              }
              else{

                console.log('else condition')

                if(home.length>0){
                  console.log('lenght greater then zero')
                  data.home_id = home[0].dataValues.home_id
                  callback(null,data);
                }
              }
            }

            else
                callback('error in getting home data',null);


        });


    },
  addHome:function(data,callback){
      const { name,description,accountId} =data
      const addObj =  models.home.build({name: name, description:description,accountAccountId:accountId,modeId : 1});
      homeManager.addHome(addObj).then(function(obj){
        callback(null,obj)

      })
  },

  getAllHome:function(callback){

    homeManager.getAllHomes().then(function(obj){
      callback(null,obj)

    })
  }




  }



