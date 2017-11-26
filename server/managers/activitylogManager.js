/**
 * Created by Irfan on 02-Jul-17.
 */

var models = require('../models');
module.exports = {

    getByHomeId:function(query_data)
    {
     return models.activity_log.findAll({where:{homeHomeId:query_data.home_id},include:[models.switches,models.home,models.user,models.palace,models.floor]});


    }





}