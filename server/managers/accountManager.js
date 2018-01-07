/**
 * Created by Irfan on 11-Jun-17.
 */
/**
 * Created by Irfan on 11-Jun-17.
 */
var sequelize = require('sequelize')

var models = require('../models');

module.exports = {

  addAccount:function(Obj){

    return Obj.save()

  },

  getAllDataByAccount:function(){

    return models.palace.findAll(Object.assign({
      include : [{
        model : models.floor,
        include : [{
          model : models.home,
          include : [{
            model : models.account

          }]

        }]
      }]
    }))


  },

  getAllAccount:function(Obj){

    return models.account.findAll()

  }





}