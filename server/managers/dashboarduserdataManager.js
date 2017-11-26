/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getByUserid:function(query_data)
    {


        return models.dashboard_userdata.findAll({where:{userUserName:query_data.user_name},include:[models.floor,models.switches,models.palace,models.sensor]})
    }




}/**
 * Created by Irfan on 05-Jul-17.
 */



