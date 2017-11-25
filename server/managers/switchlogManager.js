
/**
 * Created by Irfan on 11-Jun-17.
 */
var models = require('../models');

module.exports = {

    getBulbLog:function(query_data)
    {

        return models.switch_log.findAll({where:{date:query_data.date,switchSwitchId:query_data.switches},include:[{model:models.switches,where:{applianceApplianceId:1}}] })
    },
    getFanLog:function(query_data){

        return models.switch_log.findAll({where:{date:query_data.date,switchSwitchId:query_data.switches},include:[{model:models.switches,where:{applianceApplianceId:2}}] });

    },
    addLogbyId:function(query_data){


        return models.switch_log.create({status:query_data.status,

            date:query_data.date,
            time:query_data.time,
            total:query_data.total,
            total_on:query_data.total_on,
            switchSwitchId:query_data.switch_id});
    }



}

