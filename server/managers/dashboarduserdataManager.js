/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getByUserid:function(query_data)
    {
        return models.dashboard_userdata.findAll({where:{userUserName:query_data.user_name},include:[models.floor,models.switches,models.palace,models.sensor]})
    },
  updateHomeMode:function(query_data)
  {
      console.log('updateHomeMode query data')
    console.log(query_data)
    return models.home.update({  modeId:query_data.mode},{ where:{home_id:query_data.home_id}});
  }


}


