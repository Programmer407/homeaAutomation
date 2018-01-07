/**
 * Created by Irfan on 11-Jun-17.
 */
var accountManager = require('../managers/accountManager');
var models = require('../models');

module.exports ={

  addAccount:function(data,callback){
    const { status} =data
    const addObj =  models.account.build({status: status});
    accountManager.addAccount(addObj).then(function(obj){
      callback(null,obj)

    })
  },

  getAllData:function(callback){

    accountManager.getAllDataByAccount().then(function(obj){
      callback(null,obj)

    })
  },

  getAllAccount:function(callback){

    accountManager.getAllAccount().then(function(obj){
      callback(null,obj)

    })
  }





}